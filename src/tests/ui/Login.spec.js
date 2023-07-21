import React from 'react'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from '../../ui/Login'

describe('Login component', () => {
  test('should handle username and password changes', () => {
    render(<Login handleLogin={jest.fn()} />)

    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } })

    expect(usernameInput.value).toBe('testuser')
    expect(passwordInput.value).toBe('testpassword')
  })

  test('should handle form submission and call handleLogin', async () => {
    const mockHandleLogin = jest.fn()
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ token: 'testtoken' })
    })

    render(<Login handleLogin={mockHandleLogin} />)

    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByText('Login')

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'testuser' } })
      fireEvent.change(passwordInput, { target: { value: 'testpassword' } })
    })

    act(() => {
      fireEvent.click(submitButton)
    })

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/v1/auth/login'),
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'testuser',
          password: 'testpassword'
        })
      })
    )

    await waitFor(() => {
      expect(mockHandleLogin).toHaveBeenCalledWith('testtoken')
    })
  })

  test('should display error message on failed login', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ error: 'Invalid username or password!' })
    })

    render(<Login handleLogin={jest.fn()} />)

    const submitButton = screen.getByText('Login')

    act(() => {
      fireEvent.click(submitButton)
    })

    await screen.findByText('Invalid username or password!')
  })

  test('should display error message on service failure', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Service Unavailable!'))

    render(<Login handleLogin={jest.fn()} />)

    const submitButton = screen.getByText('Login')

    act(() => {
      fireEvent.click(submitButton)
    })

    await screen.findByText('Service Unavailable!')
  })
})

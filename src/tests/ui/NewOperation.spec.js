import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NewOperation } from '../../ui/NewOperation';
import { RecordsTableContext } from '../../ui/RecordsTableContext';

describe('NewOperation', () => {
  test('should handle operation and display response', async () => {
    const mockHandleLogout = jest.fn();
    const mockPerformCalculation = jest.fn().mockResolvedValue('10');
    const incomingOperations = [];
    const token = 'testToken';
    

    render(
        <RecordsTableContext.Provider
          value={{
            prevPageRef: { current: 1 }, // Provide a valid value for prevPageRef
            prevFiltersRef: { current: {} },
            prevSorterRef: { current: {} },
            filteredData: [],
            setFilteredData: jest.fn(),
            totalItens: 0,
            setTotalItens: jest.fn(),
            updateData: jest.fn(),
          }}
        >
          <NewOperation token={token} handleLogout={mockHandleLogout} incomingOperations={incomingOperations} />
        </RecordsTableContext.Provider>
      );

    const firstOperandInput = screen.getByPlaceholderText('Operand 1');
    const operatorSelect = screen.getByPlaceholderText('Select an operation');
    const calculateButton = screen.getByText('Calculate');

    // Set input values and select operator
    fireEvent.change(firstOperandInput, { target: { value: '5' } });
    fireEvent.change(operatorSelect, { target: { value: 'addition' } });

    // Mock the performCalculation function and wait for the response
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ result: '10' }),
      })
    );

    // Click the Calculate button
    fireEvent.click(calculateButton);

    // Wait for the response to be displayed
    await screen.findByText('Response: 10');

    // Assert that the performCalculation function was called with the correct parameters
    expect(mockPerformCalculation).toHaveBeenCalledWith('testtoken', {
      operator: 'addition',
      method: 'arithmetic-operation',
      operands: ['5'],
    });

    // Assert that the handleLogout function was not called
    expect(mockHandleLogout).not.toHaveBeenCalled();
  });
});

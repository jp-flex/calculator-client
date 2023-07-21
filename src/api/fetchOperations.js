import axios from 'axios'

export const fetchOperations = async (token) => {
  const url = `${process.env.REACT_APP_HOST}/v1/calculator/operations`

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  })

  return response.data.operations
}

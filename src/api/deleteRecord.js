import axios from 'axios'

export const deleteRecord = async (token, id) => {
  const url = `${process.env.REACT_APP_HOST}/v1/records/${id}`

  await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

import * as axios from 'axios'

export const performCalculation = async (token, params) => {
  const url = `${process.env.REACT_APP_HOST}/v1/calculator/${params.method}/${params.operator}`
  const body = { operands: params.operands.map(n => Number(n)) }
  const response = await axios.post(url, body, {
    headers: { Authorization: `Bearer ${token}` }
  })

  return response.data.result
}

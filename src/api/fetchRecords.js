import axios from 'axios'

const buildQueryString = (params) => {
  const queryParams = []
  for (const key in params) {
    const value = params[key]
    if (value !== undefined && value !== null) {
      queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
  }
  return queryParams.join('&')
}

export const fetchRecordsByPage = async (token, pagination, filter = {}) => {
  const queryString = buildQueryString({ ...pagination, ...filter })

  const url = `${process.env.REACT_APP_HOST}/truenorth/v1/records?${queryString}`

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  })

  const records = response.data.records.map(record => {
    return {
      id: record.id,
      operation: record.operation.type,
      amount: Number(record.amount),
      userBalance: Number(record.userBalance),
      response: record.operationResponse,
      date: new Date(record.createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }
  })

  return { records, total: response.data.total }
}

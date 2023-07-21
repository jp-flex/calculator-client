import { React, useState } from 'react'
import './App.css'
import Login from './ui/Login'
import Records from './ui/Records'
import { fetchRecordsByPage } from './api/fetchRecords'
import { NewOperation } from './ui/NewOperation'
import { RecordsTableProvider } from './ui/RecordsTableContext'
import { fetchOperations } from './api/fetchOperations'

const initialPageSize = 10
function App () {
  const [token, setToken] = useState(null)
  const [records, setRecords] = useState([])
  const [totalRecords, setTotalRecords] = useState(0)
  const [operations, setOperations] = useState([])

  const fetchApi = async (tokenValue) => {
    try {
      const data = await fetchRecordsByPage(tokenValue, { limit: initialPageSize, page: 1 })
      const operations = await fetchOperations(tokenValue)
      setRecords(data.records)
      setTotalRecords(data.total)
      setToken(tokenValue)
      setOperations(operations)
    } catch (error) {
      setToken(null)
    }
  }

  const handleLogin = (token) => {
    fetchApi(token)
  }

  const handleLogout = () => {
    setToken(null)
  }

  return (
    <div>
      {!token
        ? (
          <Login handleLogin={handleLogin} />
        )
        : (
          <RecordsTableProvider data={records} totalRecords={totalRecords} token={token}>
            <NewOperation token={token} incomingOperations={operations} handleLogout={handleLogout}/>
            <Records token={token} />
          </RecordsTableProvider>
        )}
    </div>
  )
}

export default App

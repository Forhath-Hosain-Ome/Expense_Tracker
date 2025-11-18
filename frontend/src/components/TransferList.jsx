import { useEffect, useState } from 'react'
import api from '../api'

export default function TransferList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    api.getTransfers()
      .then((data) => mounted && setItems(data || []))
      .catch((e) => mounted && setError(e.message))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  if (loading) return <div>Loading transfers...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!items.length) return <div>No transfers yet</div>

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.from_account} → {item.to_account} — {item.amount}</li>
      ))}
    </ul>
  )
}

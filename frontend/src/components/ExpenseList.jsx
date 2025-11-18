import { useEffect, useState } from 'react'
import api from '../api'

export default function ExpenseList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    api.getExpenses()
      .then((data) => mounted && setItems(data || []))
      .catch((e) => mounted && setError(e.message))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  if (loading) return <div>Loading expenses...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!items.length) return <div>No expenses yet</div>

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.description || item.title} — {item.amount}</li>
      ))}
    </ul>
  )
}

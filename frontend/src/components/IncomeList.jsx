import { useEffect, useState } from 'react'
import api from '../api'

export default function IncomeList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    api.getIncomes()
      .then((data) => mounted && setItems(data || []))
      .catch((e) => mounted && setError(e.message))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  if (loading) return <div>Loading incomes...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!items.length) return <div>No incomes yet</div>

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.description || item.title} — {item.amount}</li>
      ))}
    </ul>
  )
}

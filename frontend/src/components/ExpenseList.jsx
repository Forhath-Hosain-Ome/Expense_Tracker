import { useEffect, useState } from 'react'
import api from '../api'

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    api.getExpenses()
      .then((data) => mounted && setExpenses(data || []))
      .catch((e) => mounted && setError(e))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  if (loading) return <div>Loading expenses...</div>
  if (error) return <div>Error loading expenses</div>
  if (!expenses.length) return <div>No expenses yet</div>

  return (
    <ul>
      {expenses.map((x) => (
        <li key={x.id}>{x.title} — {x.amount}</li>
      ))}
    </ul>
  )
}

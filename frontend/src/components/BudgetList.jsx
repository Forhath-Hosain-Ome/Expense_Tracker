import { useEffect, useState } from 'react'
import api from '../api'

export default function BudgetList() {
  const [budgets, setBudgets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    api.getBudgets()
      .then((data) => mounted && setBudgets(data || []))
      .catch((e) => mounted && setError(e))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  if (loading) return <div>Loading budgets...</div>
  if (error) return <div>Error loading budgets</div>
  if (!budgets.length) return <div>No budgets yet</div>

  return (
    <ul>
      {budgets.map((b) => (
        <li key={b.id}>{b.name} — {b.amount}</li>
      ))}
    </ul>
  )
}

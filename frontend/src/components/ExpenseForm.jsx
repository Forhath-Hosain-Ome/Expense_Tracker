import { useState } from 'react'
import api from '../api'

export default function ExpenseForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [budgetId, setBudgetId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const payload = { title, amount: parseFloat(amount), budget: budgetId || null }
      const created = await api.createExpense(payload)
      setTitle('')
      setAmount('')
      onCreated && onCreated(created)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Amount</label>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} required type="number" step="0.01" />
      </div>
      <div>
        <label>Budget ID (optional)</label>
        <input value={budgetId} onChange={(e) => setBudgetId(e.target.value)} />
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Expense'}</button>
      {error && <div className="error">Error creating expense</div>}
    </form>
  )
}

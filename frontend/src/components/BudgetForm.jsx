import { useState } from 'react'
import api from '../api'

export default function BudgetForm({ onCreated }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const payload = { name, amount: parseFloat(amount) }
      const created = await api.createBudget(payload)
      setName('')
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
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Amount</label>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} required type="number" step="0.01" />
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Budget'}</button>
      {error && <div className="error">Error creating budget</div>}
    </form>
  )
}

import { useState } from 'react'
import api from '../api'

export default function IncomeForm({ onCreated }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const payload = { description, amount: parseFloat(amount) }
      const created = await api.createIncome(payload)
      setDescription('')
      setAmount('')
      onCreated && onCreated(created)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Description</label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Amount</label>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} required type="number" step="0.01" />
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Add Income'}</button>
      {error && <div className="error">Error: {error}</div>}
    </form>
  )
}

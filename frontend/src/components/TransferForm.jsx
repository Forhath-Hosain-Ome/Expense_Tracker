import { useState } from 'react'
import api from '../api'

export default function TransferForm({ onCreated }) {
  const [fromAccount, setFromAccount] = useState('')
  const [toAccount, setToAccount] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const payload = { from_account: fromAccount, to_account: toAccount, amount: parseFloat(amount) }
      const created = await api.createTransfer(payload)
      setFromAccount('')
      setToAccount('')
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
        <label>From Account</label>
        <input value={fromAccount} onChange={(e) => setFromAccount(e.target.value)} required />
      </div>
      <div>
        <label>To Account</label>
        <input value={toAccount} onChange={(e) => setToAccount(e.target.value)} required />
      </div>
      <div>
        <label>Amount</label>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} required type="number" step="0.01" />
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Transfer'}</button>
      {error && <div className="error">Error: {error}</div>}
    </form>
  )
}

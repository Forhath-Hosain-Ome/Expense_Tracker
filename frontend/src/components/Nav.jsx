import { Link } from 'react-router-dom'
import './Nav.css'

export default function Nav() {
  return (
    <nav className="nav-menu">
      <div className="nav-section">
        <h3>Transactions</h3>
        <Link to="/incomes">Incomes</Link>
        <Link to="/expenses">Expenses</Link>
        <Link to="/transfers">Transfers</Link>
      </div>
      <div className="nav-section">
        <h3>Planning</h3>
        <Link to="/budgets">Budgets</Link>
        <Link to="/recurring">Recurring</Link>
      </div>
      <div className="nav-section">
        <h3>Auth</h3>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  )
}

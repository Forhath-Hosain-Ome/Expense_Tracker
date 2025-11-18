import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import BudgetList from './components/BudgetList'
import BudgetForm from './components/BudgetForm'
import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header>
          <h1>Expense Tracker</h1>
          <nav>
            <Link to="/">Budgets</Link> | <Link to="/expenses">Expenses</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<>
              <BudgetForm />
              <BudgetList />
            </>} />
            <Route path="/expenses" element={<>
              <ExpenseForm />
              <ExpenseList />
            </>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'

// Income
import IncomeList from './components/IncomeList'
import IncomeForm from './components/IncomeForm'

// Expense
import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'

// Transfer
import TransferList from './components/TransferList'
import TransferForm from './components/TransferForm'

// Budget
import BudgetList from './components/BudgetList'
import BudgetForm from './components/BudgetForm'

// Recurring
import RecurringList from './components/RecurringList'
import RecurringForm from './components/RecurringForm'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header>
          <h1>Expense Tracker</h1>
        </header>

        <Nav />

        <main>
          <Routes>
            <Route path="/incomes" element={<><IncomeForm /><IncomeList /></>} />
            <Route path="/expenses" element={<><ExpenseForm /><ExpenseList /></>} />
            <Route path="/transfers" element={<><TransferForm /><TransferList /></>} />
            <Route path="/budgets" element={<><BudgetForm /><BudgetList /></>} />
            <Route path="/recurring" element={<><RecurringForm /><RecurringList /></>} />
            <Route path="/" element={<h2>Welcome! Select a section from the menu.</h2>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

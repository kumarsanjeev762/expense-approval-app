import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getExpenses } from '../utils/expenseStorage.js'

function formatAmount(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(amount))
}

function MyExpensesPage() {
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    setExpenses(getExpenses())
  }, [])

  return (
    <section className="my-expenses-page" aria-labelledby="my-expenses-title">
      <h2 id="my-expenses-title">My Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses yet. Create one to get started.</p>
      ) : (
        <ul className="expense-list" aria-label="My Expenses">
          {expenses.map((expense) => (
            <li key={expense.id} className="expense-list-item">
              <div className="expense-summary">
                <span className="expense-amount">{formatAmount(expense.amount)}</span>
                <span className="expense-category">{expense.category}</span>
                <span className="expense-date">{expense.date}</span>
              </div>
              <p className="expense-description">{expense.description}</p>
              <span className="expense-status" data-status={expense.status}>
                {expense.status}
              </span>
            </li>
          ))}
        </ul>
      )}

      <Link className="back-link" to="/">
        &larr; Back to Dashboard
      </Link>
    </section>
  )
}

export default MyExpensesPage

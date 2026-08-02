import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addExpense, EXPENSE_CATEGORIES } from '../utils/expenseStorage.js'
import { validateExpenseForm } from '../utils/validation.js'

const INITIAL_FORM = {
  amount: '',
  date: '',
  category: '',
  description: '',
}

function CreateExpensePage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})

  function handleChange(field) {
    return (event) => {
      const { value } = event.target
      setForm((prev) => ({ ...prev, [field]: value }))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateExpenseForm(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    addExpense(form)
    navigate('/expenses')
  }

  return (
    <section className="create-expense-page" aria-labelledby="create-expense-title">
      <h2 id="create-expense-title">Create Expense</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            value={form.amount}
            onChange={handleChange('amount')}
            aria-invalid={Boolean(errors.amount)}
            aria-describedby={errors.amount ? 'amount-error' : undefined}
          />
          {errors.amount && (
            <p id="amount-error" className="field-error" role="alert">
              {errors.amount}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange('date')}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? 'date-error' : undefined}
          />
          {errors.date && (
            <p id="date-error" className="field-error" role="alert">
              {errors.date}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange('category')}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? 'category-error' : undefined}
          >
            <option value="">Select a category&hellip;</option>
            {EXPENSE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p id="category-error" className="field-error" role="alert">
              {errors.category}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange('description')}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? 'description-error' : undefined}
          />
          {errors.description && (
            <p id="description-error" className="field-error" role="alert">
              {errors.description}
            </p>
          )}
        </div>

        <div className="form-actions">
          <button type="submit">Submit Expense</button>
          <Link className="back-link" to="/">
            &larr; Back to Dashboard
          </Link>
        </div>
      </form>
    </section>
  )
}

export default CreateExpensePage

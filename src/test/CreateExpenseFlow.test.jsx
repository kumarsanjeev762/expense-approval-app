import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.jsx'
import { STORAGE_KEY } from '../utils/expenseStorage.js'

function renderApp(initialEntries = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>,
  )
}

async function fillAndSubmitExpenseForm(
  user,
  { amount = '42.50', date = '2024-01-15', category = 'Travel', description = 'Taxi to airport' } = {},
) {
  if (amount !== undefined) {
    await user.clear(screen.getByLabelText(/amount/i))
    await user.type(screen.getByLabelText(/amount/i), amount)
  }
  if (date !== undefined) {
    await user.clear(screen.getByLabelText(/date/i))
    await user.type(screen.getByLabelText(/date/i), date)
  }
  if (category !== undefined) {
    await user.selectOptions(screen.getByLabelText(/category/i), category)
  }
  if (description !== undefined) {
    await user.clear(screen.getByLabelText(/description/i))
    await user.type(screen.getByLabelText(/description/i), description)
  }

  await user.click(screen.getByRole('button', { name: /submit expense/i }))
}

describe('Create Expense flow', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    window.localStorage.clear()
  })

  it('renders the Create Expense form with amount, date, category, and description fields', () => {
    renderApp(['/expenses/new'])

    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /submit expense/i }),
    ).toBeInTheDocument()
  })

  it('shows validation errors and does not save or navigate when the form is submitted empty', async () => {
    const user = userEvent.setup()
    renderApp(['/expenses/new'])

    await user.click(screen.getByRole('button', { name: /submit expense/i }))

    expect(await screen.findAllByRole('alert')).not.toHaveLength(0)
    expect(
      screen.getByRole('heading', { level: 2, name: /create expense/i }),
    ).toBeInTheDocument()
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull()
  })

  it('rejects a non-positive amount', async () => {
    const user = userEvent.setup()
    renderApp(['/expenses/new'])

    await fillAndSubmitExpenseForm(user, { amount: '0' })

    expect(
      await screen.findByText(/amount must be greater than zero/i),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /create expense/i }),
    ).toBeInTheDocument()
  })

  it('saves a valid expense to localStorage with Pending status and navigates to My Expenses', async () => {
    const user = userEvent.setup()
    renderApp(['/expenses/new'])

    await fillAndSubmitExpenseForm(user)

    expect(
      await screen.findByRole('heading', { level: 2, name: /my expenses/i }),
    ).toBeInTheDocument()

    const item = screen.getByText(/taxi to airport/i).closest('li')
    expect(item).not.toBeNull()
    expect(within(item).getByText(/pending/i)).toBeInTheDocument()
    expect(within(item).getByText('Travel')).toBeInTheDocument()

    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    expect(stored).toHaveLength(1)
    expect(stored[0]).toMatchObject({
      amount: 42.5,
      date: '2024-01-15',
      category: 'Travel',
      description: 'Taxi to airport',
      status: 'Pending',
    })
  })

  it('shows previously created expenses on the My Expenses page', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'existing-1',
          amount: 100,
          date: '2024-02-01',
          category: 'Meals',
          description: 'Team lunch',
          status: 'Pending',
          createdAt: '2024-02-01T00:00:00.000Z',
        },
      ]),
    )

    renderApp(['/expenses'])

    expect(screen.getByText(/team lunch/i)).toBeInTheDocument()
    expect(screen.getByText('Pending')).toBeInTheDocument()
  })

  it('shows an empty state on My Expenses when there are no saved expenses', () => {
    renderApp(['/expenses'])

    expect(screen.getByText(/no expenses yet/i)).toBeInTheDocument()
  })
})

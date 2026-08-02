import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.jsx'

function renderApp(initialEntries = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>,
  )
}

describe('Dashboard and navigation', () => {
  it('renders the Welcome dashboard title and subtitle on the homepage', () => {
    renderApp()

    expect(
      screen.getByRole('heading', { level: 1, name: /welcome/i }),
    ).toBeInTheDocument()
  })

  it('renders navigation links for Create Expense, My Expenses, and Approvals', () => {
    renderApp()

    expect(
      screen.getByRole('link', { name: /create expense/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /my expenses/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /approvals/i }),
    ).toBeInTheDocument()
  })

  it('navigates to the Create Expense placeholder page and back to the dashboard', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('link', { name: /create expense/i }))

    expect(
      screen.getByRole('heading', { level: 2, name: /create expense/i }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: /back to dashboard/i }))

    expect(
      screen.getByRole('heading', { level: 1, name: /welcome/i }),
    ).toBeInTheDocument()
  })

  it('navigates to the My Expenses placeholder page and back to the dashboard', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('link', { name: /my expenses/i }))

    expect(
      screen.getByRole('heading', { level: 2, name: /my expenses/i }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: /back to dashboard/i }))

    expect(
      screen.getByRole('heading', { level: 1, name: /welcome/i }),
    ).toBeInTheDocument()
  })

  it('navigates to the Approvals placeholder page and back to the dashboard', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('link', { name: /approvals/i }))

    expect(
      screen.getByRole('heading', { level: 2, name: /approvals/i }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: /back to dashboard/i }))

    expect(
      screen.getByRole('heading', { level: 1, name: /welcome/i }),
    ).toBeInTheDocument()
  })

  it('renders each placeholder page directly with a heading and back link', () => {
    renderApp(['/expenses'])
    expect(
      screen.getByRole('heading', { level: 2, name: /my expenses/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /back to dashboard/i }),
    ).toBeInTheDocument()

    renderApp(['/approvals'])
    expect(
      screen.getAllByRole('heading', { level: 2, name: /approvals/i })[0],
    ).toBeInTheDocument()
  })
})

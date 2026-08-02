import { Link } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/expenses/new', label: 'Create Expense' },
  { to: '/expenses', label: 'My Expenses' },
  { to: '/approvals', label: 'Approvals' },
]

function Dashboard() {
  return (
    <section aria-labelledby="dashboard-title">
      <h1 id="dashboard-title">Welcome</h1>
      <p className="subtitle">
        This is your expense approval dashboard. Choose an option below to get
        started.
      </p>
      <nav className="dashboard-nav" aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <Link key={item.to} to={item.to}>
            {item.label}
          </Link>
        ))}
      </nav>
    </section>
  )
}

export default Dashboard

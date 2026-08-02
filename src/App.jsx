import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import CreateExpensePage from './pages/CreateExpensePage.jsx'
import MyExpensesPage from './pages/MyExpensesPage.jsx'
import ApprovalsPage from './pages/ApprovalsPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/expenses/new" element={<CreateExpensePage />} />
      <Route path="/expenses" element={<MyExpensesPage />} />
      <Route path="/approvals" element={<ApprovalsPage />} />
    </Routes>
  )
}

export default App

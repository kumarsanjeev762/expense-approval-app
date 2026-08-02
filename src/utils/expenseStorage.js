const STORAGE_KEY = 'expense-approval-app:expenses'

export const EXPENSE_CATEGORIES = [
  'Travel',
  'Meals',
  'Office Supplies',
  'Software',
  'Other',
]

function readExpenses() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeExpenses(expenses) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
}

export function getExpenses() {
  return readExpenses().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

export function addExpense({ amount, date, category, description }) {
  const expense = {
    id:
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `expense-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    amount: Number(amount),
    date,
    category,
    description,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  }

  const expenses = readExpenses()
  expenses.push(expense)
  writeExpenses(expenses)

  return expense
}

export { STORAGE_KEY }

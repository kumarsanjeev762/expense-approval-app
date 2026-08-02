/**
 * Generic form validation utilities shared across the app's forms.
 */

export function isBlank(value) {
  return value === undefined || value === null || String(value).trim() === ''
}

export function validateRequired(value, fieldLabel) {
  return isBlank(value) ? `${fieldLabel} is required.` : null
}

export function validatePositiveNumber(value, fieldLabel) {
  if (isBlank(value)) return `${fieldLabel} is required.`
  const number = Number(value)
  if (Number.isNaN(number)) return `${fieldLabel} must be a number.`
  if (number <= 0) return `${fieldLabel} must be greater than zero.`
  return null
}

export function validateNotFutureDate(value, fieldLabel) {
  if (isBlank(value)) return `${fieldLabel} is required.`
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return `${fieldLabel} must be a valid date.`
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  if (date.getTime() > today.getTime()) {
    return `${fieldLabel} cannot be in the future.`
  }
  return null
}

/**
 * Validates the "Create Expense" form fields.
 * Returns an object keyed by field name with error messages, only for
 * fields that failed validation.
 */
export function validateExpenseForm({ amount, date, category, description }) {
  const errors = {}

  const amountError = validatePositiveNumber(amount, 'Amount')
  if (amountError) errors.amount = amountError

  const dateError = validateNotFutureDate(date, 'Date')
  if (dateError) errors.date = dateError

  const categoryError = validateRequired(category, 'Category')
  if (categoryError) errors.category = categoryError

  const descriptionError = validateRequired(description, 'Description')
  if (descriptionError) errors.description = descriptionError

  return errors
}

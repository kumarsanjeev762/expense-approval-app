import { describe, expect, it } from 'vitest'
import { validateExpenseForm } from '../utils/validation.js'

describe('validateExpenseForm', () => {
  it('returns an error for every required field when all are blank', () => {
    const errors = validateExpenseForm({
      amount: '',
      date: '',
      category: '',
      description: '',
    })

    expect(errors).toHaveProperty('amount')
    expect(errors).toHaveProperty('date')
    expect(errors).toHaveProperty('category')
    expect(errors).toHaveProperty('description')
  })

  it('rejects non-numeric and non-positive amounts', () => {
    expect(
      validateExpenseForm({
        amount: 'abc',
        date: '2024-01-01',
        category: 'Travel',
        description: 'x',
      }).amount,
    ).toMatch(/number/i)

    expect(
      validateExpenseForm({
        amount: '-5',
        date: '2024-01-01',
        category: 'Travel',
        description: 'x',
      }).amount,
    ).toMatch(/greater than zero/i)
  })

  it('rejects future dates', () => {
    const future = new Date()
    future.setFullYear(future.getFullYear() + 1)
    const futureDate = future.toISOString().slice(0, 10)

    const errors = validateExpenseForm({
      amount: '10',
      date: futureDate,
      category: 'Travel',
      description: 'x',
    })

    expect(errors.date).toMatch(/future/i)
  })

  it('returns no errors for a fully valid form', () => {
    const errors = validateExpenseForm({
      amount: '25.5',
      date: '2024-01-01',
      category: 'Travel',
      description: 'Client dinner',
    })

    expect(errors).toEqual({})
  })
})

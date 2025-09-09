
import { describe, it, expect, vi } from 'vitest'
import useHandleDate from '@/composables/useHandleDate'

describe('useHandleDate', () => {
  const {
    timestampToDay,
    getDateInTimestamp,
    getTodayInDDMMYYYY,
    getDateInDDMMYYYY
  } = useHandleDate()

  it('should convert timestamp to day', () => {
    const date = new Date('2023-08-22')
    const timestamp = date.getTime()
    expect(timestampToDay(timestamp)).toBe('22')
  })

  it('should return Unix timestamp in seconds from a Date object', () => {
    const date = new Date('2023-01-01T00:00:00Z')
    expect(getDateInTimestamp(date)).toBe(Math.floor(date.getTime() / 1000))
  })

  it('should return today\'s date in DD/MM/YYYY format', () => {
    const today = new Date()
    const expected = today.toLocaleDateString('en-GB').split('/').join('/')
    expect(getTodayInDDMMYYYY()).toBe(expected)
  })

  it('should format given date as DD/MM/YYYY', () => {
    const date = new Date('2024-03-05T00:00:00Z') // March 5th, 2024
    expect(getDateInDDMMYYYY(date)).toBe('05/03/2024')
  })

  it('should pad day and month with leading zero if needed', () => {
    const date = new Date('2023-01-02') // January 2nd, 2023
    expect(getDateInDDMMYYYY(date)).toBe('02/01/2023')
  })
})

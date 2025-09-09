
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import WeekOverview from '@/components/molecules/weekOverview.vue'

// Mock router
const pushMock = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: pushMock })
}))

describe('WeekOverview.vue', () => {
  let wrapper

  const mockWeekData = [
    { day: 'Mon', date: new Date().setHours(0, 0, 0, 0), grade: 100 },
    { day: 'Tue', date: 1693603200000, grade: 80 },
    { day: 'Wed', date: 1693689600000, grade: 60 },
    { day: 'Thu', date: 1693776000000, grade: null },
    { day: 'Fri', date: 1693862400000, grade: 50 },
    { day: 'Sat', date: 1693948800000, grade: null },
    { day: 'Sun', date: 1694035200000, grade: 100 },
  ]

  beforeEach(() => {
    pushMock.mockReset()
    wrapper = mount(WeekOverview, {
      props: {
        weekData: mockWeekData
      }
    })
  })

  it('renders a title and 7 day cards', () => {
    expect(wrapper.find('h3').text()).toBe('The last 7 days')
    const days = wrapper.findAll('.week-overview-day')
    expect(days.length).toBe(7)
  })

  it('makes today\'s date bold', () => {
    const todayIndex = mockWeekData.findIndex(
      (d) => d.date === new Date().setHours(0, 0, 0, 0)
    )
    const headers = wrapper.findAll('.week-overview-day-header')
    expect(headers[todayIndex].attributes('style')).toContain('font-weight: bold')
  })

  it('navigates with edit=true when grade exists', async () => {
    const firstDay = wrapper.findAll('.week-overview-day-body')[0]
    await firstDay.trigger('click')
    expect(pushMock).toHaveBeenCalledWith(
      `/form?edit=true&date=${mockWeekData[0].date}`
    )
  })

  it('navigates with edit=false when grade is null', async () => {
    const fourthDay = wrapper.findAll('.week-overview-day-body')[3]
    await fourthDay.trigger('click')
    expect(pushMock).toHaveBeenCalledWith(
      `/form?edit=false&date=${mockWeekData[3].date}`
    )
  })
})

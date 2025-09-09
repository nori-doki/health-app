import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import dailyForm from '@/components/molecules/dailyForm.vue'
import { nextTick } from 'vue'

// Setup mocks
let routeQuery = {}

const pushMock = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: pushMock }),
  useRoute: () => ({ query: routeQuery })
}))

vi.mock('vue3-cookies', () => ({
  useCookies: () => ({
    cookies: {
      get: () => 'mock-user-id'
    }
  })
}))

vi.mock('@/services/score.service', () => {
  const addScoreMock = vi.fn()
  const updateScoreMock = vi.fn()
  const checkScoreMock = vi.fn()
  return {
    ScoreService: {
      addDailyScores: addScoreMock,
      updateDailyScores: updateScoreMock,
      checkScoreExists: checkScoreMock
    },
    __mocks: {
      addScoreMock,
      updateScoreMock,
      checkScoreMock
    }
  }
})

describe('dailyForm.vue', () => {
  let wrapper
  let addScoreMock, updateScoreMock, checkScoreMock

  beforeEach(async () => {
    const mocks = (await import('@/services/score.service')).__mocks
    addScoreMock = mocks.addScoreMock
    updateScoreMock = mocks.updateScoreMock
    checkScoreMock = mocks.checkScoreMock

    addScoreMock.mockReset()
    updateScoreMock.mockReset()
    checkScoreMock.mockReset()
    pushMock.mockReset()

    routeQuery = {}

    wrapper = mount(dailyForm)
  })

  it('renders all 6 form items', () => {
    const items = wrapper.findAll('.daily-form-item')
    expect(items.length).toBe(6)
  })

  it('displays loader when isLoading is true', async () => {
    wrapper.vm.isLoading = true
    await nextTick()
    expect(wrapper.find('.loader').exists()).toBe(true)
    expect(wrapper.find('.daily-form-button-submit').exists()).toBe(false)
  })

  it('calls goToHomePage on leave without saving', async () => {
    const leaveButton = wrapper.find('.daily-form-button-leave')
    await leaveButton.trigger('click')
    expect(pushMock).toHaveBeenCalledWith('/home')
  })

  it('submits new score and redirects to home on success (status 201)', async () => {
    vi.useFakeTimers()
    addScoreMock.mockResolvedValueOnce({ error: null, status: 201 })

    wrapper.vm.formData = {
      meal_1: 100,
      meal_2: 100,
      meal_3: 100,
      snack: 100,
      steps: 100,
      workout: 100
    }

    await wrapper.vm.handleSubmit()
    vi.runAllTimers()

    expect(addScoreMock).toHaveBeenCalled()
    expect(pushMock).toHaveBeenCalledWith('/home')
    vi.useRealTimers()
  })

  it('logs error if addScore fails', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    addScoreMock.mockResolvedValueOnce({ error: new Error('fail'), status: 500 })

    await wrapper.vm.handleSubmit()

    expect(addScoreMock).toHaveBeenCalled()
    expect(errorSpy).toHaveBeenCalledWith('Error adding daily scores', expect.any(Error))

    errorSpy.mockRestore()
  })

  it('edits score if query.edit is true', async () => {
    routeQuery = { edit: 'true' }
    updateScoreMock.mockResolvedValueOnce({ error: null, status: 204 })

    wrapper = mount(dailyForm)

    wrapper.vm.formData = {
      meal_1: 100,
      meal_2: 100,
      meal_3: 100,
      snack: 100,
      steps: 100,
      workout: 100
    }

    await wrapper.vm.handleSubmit()
    expect(updateScoreMock).toHaveBeenCalled()
    expect(pushMock).toHaveBeenCalledWith('/home')
  })
})

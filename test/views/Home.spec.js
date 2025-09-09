
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import BaseDonut from '@/components/atoms/baseDonut.vue'
import WeekOverview from '@/components/molecules/weekOverview.vue';
import Button from 'primevue/button';
import PrimeVue from 'primevue/config';

const mockPush = vi.fn()

vi.mock('vue-router', () => ({
    useRouter: () => ({ push: mockPush })
}))

vi.mock('vue3-cookies', () => ({
    useCookies: () => ({
        cookies: {
            get: (key) => {
            if (key === 'user_id') return 'mock-user-id'
            if (key === 'nickname') return 'John'
            return null
            }
        }
    })
}))

vi.mock('@/services/score.service', () => ({
    ScoreService: {
        checkScoreExists: vi.fn(() => Promise.resolve({ data: { mean_value: 80, date: 123456789 } })),
        getDailyScores: vi.fn(() => Promise.resolve({ data: [
        { date: new Date().setHours(0, 0, 0, 0), mean_value: 70 }
        ] }))
    }
}))

describe('Home.vue', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(Home, {
            plugins: [PrimeVue],
            components: { Button, BaseDonut, WeekOverview },
            global: {
                stubs: [
                    'BaseDonut',
                    'Button'
                ]
            }
        });
    })

    it('renders user greeting with nickname', () => {
        expect(wrapper.text()).toContain('Hello, John')
    })

    it.todo('shows BaseDonut component when not loading', async () => {
        vi.useFakeTimers(); // 1. Enable fake timers

        const wrapper = mount(Home); // 2. Mount AFTER fake timers

        vi.runAllTimers(); // 3. Fast-forward all timers
        await wrapper.vm.$nextTick(); // 5. Force DOM update

        expect(wrapper.findComponent(BaseDonut).exists()).toBe(true); // 6. Assert
        console.log('wrapper.findComponent(BaseDonut):', wrapper.findComponent(BaseDonut))
        vi.useRealTimers(); // 7. Restore real timers
    })

    it('renders WeekOverview with week data', () => {
        const weekOverview = wrapper.findComponent(WeekOverview)
        expect(weekOverview.exists()).toBe(true)
        expect(weekOverview.props('weekData')).toBeInstanceOf(Array)
    })

    it.todo('button label reflects existing score', () => {
        const button = wrapper.find('.home-form-button')
        expect(button.text()).toBe('Edit your day ✏️')
    })

    it('navigates to edit form when score exists', async () => {
        await wrapper.find('.home-form-button').trigger('click')
        expect(mockPush).toHaveBeenCalledWith('/form?edit=true&date=123456789')
    })
})

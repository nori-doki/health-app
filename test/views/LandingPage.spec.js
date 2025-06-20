import { mount } from '@vue/test-utils';
import { describe, it, vi, expect } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import PrimeVue from 'primevue/config';
import LandingPage from "../../src/views/LandingPage.vue";
import useNavigate from '@/composables/useNavigate.js';
import Button from 'primevue/button';
import Typed from 'typed.js';

vi.mock('typed.js');
vi.mock('@/composables/useNavigate.js');

describe('LandingPage', () => {
  let wrapper

  beforeEach(async () => {
      useNavigate.mockReturnValue({
          goToPage: vi.fn()
      })
      wrapper = mount(LandingPage, {
        plugins: [PrimeVue],
        components: { Button },
        attachTo: document.body,
        global: {
          stubs: ['Button', 'BaseLogo', 'BaseLavaAnimation'],
        }
      })
      await wrapper.vm.$nextTick()
  })

  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.landing-page').exists()).toBe(true)
  });

  it('should initialize Typed.js with the correct options on mount', () => {
    const mockTypedInstance = {};
    Typed.mockImplementation(() => mockTypedInstance);

    expect(Typed).toHaveBeenCalledWith(wrapper.vm.typing, {
      strings: wrapper.vm.typedStrings,
      typeSpeed: 50,
      backSpeed: 60,
      loop: true
    });

    wrapper.unmount();
    vi.restoreAllMocks();
  });

  it('calls goToPage with correct route when button is clicked', async () => {
    const { goToPage } = useNavigate()
    const buttons = wrapper.findAll('.landing-page-nav-button')

    await buttons[0].trigger('click')
    expect(goToPage).toHaveBeenCalledWith('/login')

    await buttons[1].trigger('click')
    expect(goToPage).toHaveBeenCalledWith('/signUp')
})
});
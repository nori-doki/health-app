import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import BaseLogo from '@/components/atoms/baseLogo.vue';

describe('BaseLogo', () => {
    const wrapper = mount(BaseLogo)
    it('renders the logo text correctly', () => {
      const text = wrapper.text()
      expect(text).toContain('80to')
      expect(text).toContain('100')
    });
  
    it('has correct class structure', () => {
      const black = wrapper.find('.base-logo-black')
      const colored = wrapper.find('.base-logo-color')
  
      expect(black.exists()).toBe(true)
      expect(colored.exists()).toBe(true)
      expect(black.text()).toContain('80to')
      expect(colored.text()).toBe('100')
    });

    it('matches snapshot', () => {
        const wrapper = mount(BaseLogo)
        expect(wrapper.html()).toMatchSnapshot()
      });
  })
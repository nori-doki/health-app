import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import BaseLavaAnimation from '@/components/atoms/baseLavaAnimation.vue';

describe('BaseLavaAnimation', () => {
  it('mounts properly and creates 80 bubbles', async () => {
    const wrapper = mount(BaseLavaAnimation);

    const bubblesContainer = wrapper.element.querySelector('.bubbles');
    expect(bubblesContainer).not.toBeNull();

    const bubbles = wrapper.findAll('.bubble');
    expect(bubbles.length).toBe(80);
  })
})

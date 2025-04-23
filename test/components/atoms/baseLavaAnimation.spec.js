import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import BaseLavaAnimation from '@/components/atoms/baseLavaAnimation.vue';

describe('BaseLavaAnimation', () => {
  it.todo('mounts properly and creates 80 bubbles', async () => {
    const wrapper = mount(BaseLavaAnimation);

    
    const bubblesContainer = wrapper.element.querySelector('.bubbles');
    expect(bubblesContainer).not.toBeNull();
    
    await nextTick();
    
    const bubbles = bubblesContainer.querySelectorAll('.bubble');
    // expect(bubbles.length).toBe(80);

    // const style = bubbles[0].getAttribute('style');
    // expect(style).toContain('--size:');
    // expect(style).toContain('--position:');
    // expect(style).toContain('--time:');
  })
})

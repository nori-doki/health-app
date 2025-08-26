import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import BaseLavaAnimation from '@/components/atoms/baseLavaAnimation.vue';

describe('BaseLavaAnimation', () => {
  it('mounts properly and creates 80 bubbles', async () => {
    const wrapper = mount(BaseLavaAnimation);

    const bubblesContainer = wrapper.element.querySelector('.bubbles');
    expect(bubblesContainer).not.toBeNull();
    expect(bubblesContainer.children.length).toBe(80);
    const bubbles = wrapper.findAll('.bubble');
    console.log('bubbles:', bubbles)
    expect(bubbles.length).toBe(80);

    // const style = bubbles[0].getAttribute('style');
    // expect(style).toContain('--size:');
    // expect(style).toContain('--position:');
    // expect(style).toContain('--time:');
  })
})

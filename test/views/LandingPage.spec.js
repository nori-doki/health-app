import { mount } from '@vue/test-utils';
import { describe, it, vi, expect } from 'vitest';
import LandingPage from "../../src/views/LandingPage.vue";;
import Typed from 'typed.js';

vi.mock('typed.js');

describe('LandingPage', () => {
  it('should initialize Typed.js with the correct options on mount', () => {
    const mockTypedInstance = {};
    Typed.mockImplementation(() => mockTypedInstance);

    const wrapper = mount(LandingPage, {
      attachTo: document.body
    });

    expect(Typed).toHaveBeenCalledWith(wrapper.vm.typing, {
      strings: wrapper.vm.typedStrings,
      typeSpeed: 50,
      backSpeed: 60,
      loop: true
    });

    wrapper.unmount();
    vi.restoreAllMocks();
  });
});
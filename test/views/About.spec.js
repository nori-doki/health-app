import About from "../../src/views/About.vue";
import { describe, vi, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';

describe("About", () => {
    it("test", () => {
        const mockElement = { scrollIntoView: vi.fn() };
        vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);
        const wrapper = shallowMount(About);

        wrapper.vm.scrollToSection('test-id');

        expect(document.getElementById).toHaveBeenCalledWith('test-id');
        expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

        vi.restoreAllMocks();
    })
})
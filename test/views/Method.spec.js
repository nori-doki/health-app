import Method from "../../src/views/Method.vue";
import { describe, vi, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';

describe("Method", () => {
    it("test", () => {
        const mockElement = { scrollIntoView: vi.fn() };
        vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);
        const wrapper = shallowMount(Method);

        wrapper.vm.scrollToSection('test-id');

        expect(document.getElementById).toHaveBeenCalledWith('test-id');
        expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

        vi.restoreAllMocks();
    })
})
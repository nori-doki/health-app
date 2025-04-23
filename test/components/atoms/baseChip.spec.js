import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import BaseChip from '@/components/atoms/baseChip.vue';

describe('BaseChip.vue', () => {
    it('applies --grey class when value is null', () => {
        const wrapper = mount(BaseChip, {
            props: { value: null }
        });
        expect(wrapper.find('.base-chip-color').classes()).toContain('--grey');
    });
    
    it('applies --red class when value is less than 50', () => {
        const wrapper = mount(BaseChip, {
            props: { value: 20 }
        });
        expect(wrapper.find('.base-chip-color').classes()).toContain('--red');
    });
    
    it('applies --orange class when value is between 50 and 79', () => {
        const wrapper = mount(BaseChip, {
            props: { value: 70 }
        });
        expect(wrapper.find('.base-chip-color').classes()).toContain('--orange');
    });
    
    it('applies --green class when value is 80 or more', () => {
        const wrapper = mount(BaseChip, {
        props: { value: 100 }
        });
        expect(wrapper.find('.base-chip-color').classes()).toContain('--green');
    });
});
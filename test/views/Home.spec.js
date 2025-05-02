import Home from "../../src/views/Home.vue";
import { describe, vi, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';

describe("Home", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Home);
    });

    it.todo("should render correctly", () => {
        expect(wrapper.exists()).toBe(true);
    });
})
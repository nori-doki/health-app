import BaseDonut from '../../../src/components/atoms/baseDonut.vue';
import { describe, vi, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';

describe("BaseDonut", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(BaseDonut);
    });

    it("should return correct donut color", () => {
        expect(wrapper.vm.getDonutColorArray(null)).toEqual(['#fcfcfc'])
        expect(wrapper.vm.getDonutColorArray(0)).toEqual(['#ff0000', '#e9e9e9'])
        expect(wrapper.vm.getDonutColorArray(49)).toEqual(['#ff0000', '#fcfcfc'])
        expect(wrapper.vm.getDonutColorArray(60)).toEqual(['#fffd00', '#fcfcfc'])
        expect(wrapper.vm.getDonutColorArray(79)).toEqual(['#fffd00', '#fcfcfc'])
        expect(wrapper.vm.getDonutColorArray(80)).toEqual(['#1ffb96', '#fcfcfc'])
        expect(wrapper.vm.getDonutColorArray(81)).toEqual(['#1ffb96', '#fcfcfc'])
        expect(wrapper.vm.getDonutColorArray(100)).toEqual(['#1ffb96', '#fcfcfc'])
    })

    it("should return the correct comment", () => {
        expect(wrapper.vm.gradeComment(0)).toEqual('You can still do it!');
        expect(wrapper.vm.gradeComment(null)).toEqual('Start logging your data for this week ❤️');
        expect(wrapper.vm.gradeComment(49)).toEqual('You can still do it!');
        expect(wrapper.vm.gradeComment(60)).toEqual('Almost there!');
        expect(wrapper.vm.gradeComment(80)).toEqual('Great job! Keep going!');
        expect(wrapper.vm.gradeComment(95)).toEqual('Excellent!');
    });
})
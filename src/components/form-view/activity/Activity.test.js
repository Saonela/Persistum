import React from 'react';
import {shallow} from "enzyme";
import Activity from "./Activity";

describe('Activity', () => {

    let wrapper;
    let onChangeSpy;
    let onToggleSpy;

    beforeEach(() => {
        onChangeSpy = jest.fn();
        onToggleSpy = jest.fn();
        wrapper = shallow(<Activity activity={{id: 1, name: 'test activity'}} completed={false} onToggle={onToggleSpy} onChange={onChangeSpy}/>);
    });

    it('should show activity data', () => {
        expect(wrapper.find('.activity__name').text()).toBe('test activity');
    });

    it('should show indicator if completed', () => {
        const wrapper = shallow(<Activity activity={{id: 1}} completed={true}/>);
        expect(wrapper.find('.activity__indicator').length).toBeTruthy();
    });

    it('should emit activity completion state on click', () => {
        wrapper.find('.activity').simulate('click');
        expect(onToggleSpy).toHaveBeenCalledWith();
    });

    it('should toggle name text-input on edit event', () => {
        wrapper.find('ActivityControls').prop('onEdit')();
        expect(wrapper.find('.activity__name-text').length).toBeFalsy();
        expect(wrapper.find('.activity__name-input').length).toBeTruthy();
    });

    it('should edit activity name on blur and hide text-input', () => {
        wrapper.find('ActivityControls').prop('onEdit')();
        wrapper.find('TextInput').prop('onBlur')('My test activity!');
        expect(wrapper.find('.activity__name-text').length).toBeTruthy();
        expect(wrapper.find('.activity__name-input').length).toBeFalsy();
        expect(onChangeSpy).toHaveBeenCalledWith({id: 1, name: 'My test activity!'});
    });

});

import React from 'react';
import {shallow} from "enzyme";
import LogIsCompletedMessage from "./LogIsCompletedMessage";

it('should show date', () => {
    const wrapper = shallow(<LogIsCompletedMessage date={'2020'}/>);
    expect(wrapper.find('.log-is-completed-message__date').text()).toBe('2020');
});

it('should emit event on go back button click', () => {
    const spy = jest.fn();
    const wrapper = shallow(<LogIsCompletedMessage date={'2020'} onBack={spy}/>);
    wrapper.find('.message-navigation-options__to-form .message-navigation-options__button').simulate('click');
    expect(spy).toHaveBeenCalled();
});

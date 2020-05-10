import React from 'react';
import {shallow} from "enzyme";
import Navigation from "./Navigation";

it('should display active item', () => {
    const wrapper = shallow(<Navigation.WrappedComponent history={{listen: () => {}}}/>);
    expect(wrapper.find('.navigation__button-calendar').prop('color')).toBe('default');
    expect(wrapper.find('.navigation__button-form').prop('color')).toBe('primary');
    wrapper.find('Link').at(0).prop('onClick')('CALENDAR');
    expect(wrapper.find('.navigation__button-calendar').prop('color')).toBe('primary');
    expect(wrapper.find('.navigation__button-form').prop('color')).toBe('default');
});

it('should change active item on router subscribe', () => {
    let callback;
    const history = {
        listen: (func) => {
            callback = func;
        }
    };
    const wrapper = shallow(<Navigation.WrappedComponent history={history}/>);
    callback({pathname: '/calendar'});
    expect(wrapper.find('.navigation__button-calendar').prop('color')).toBe('primary');
    expect(wrapper.find('.navigation__button-form').prop('color')).toBe('default');
});

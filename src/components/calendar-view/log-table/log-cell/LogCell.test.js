import {shallow} from "enzyme";
import React from "react";
import LogCell from "./LogCell";

describe('LogCell', () => {

    let wrapper;
    let onChangeSpy;

    const activities = [
        {id: 1, name: 'test activity 1', completed: true, style: {color: '#FFF'}},
        {id: 2, name: 'test activity 2', completed: true, style: {color: '#EBB'}},
        {id: 3, name: 'test activity 3', completed: true, style: {color: '#FAF'}},
    ]

    beforeEach(() => {
        onChangeSpy = jest.fn();
        wrapper = shallow(<LogCell key={1} timestamp={'2012-12-21'} activities={activities}/>);
    });

    it('should show timestamp and activities', () => {
        expect(wrapper.find('.log-cell__timestamp').text()).toBe('2012-12-21');
        expect(wrapper.find('.log-cell__activity').length).toBe(3);
    })
});

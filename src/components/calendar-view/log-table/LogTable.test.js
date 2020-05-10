import {shallow} from "enzyme";
import React from "react";
import LogTable from "./LogTable";

describe('LogTable', () => {

    let wrapper;
    let onChangeSpy;

    const dataLog = {
        '2012-02-16': {
            activities: [1]
        },
        '2014-12-20': {
            activities: [2]
        },
        '2019-01-11': {
            activities: [3, 4]
        }
    }

    beforeEach(() => {
        onChangeSpy = jest.fn();
        wrapper = shallow(<LogTable dataLog={dataLog}/>);
    });

    it('should display log cells', () => {
        expect(wrapper.find('.log-table__cell').length).toBe(3);
    })
});

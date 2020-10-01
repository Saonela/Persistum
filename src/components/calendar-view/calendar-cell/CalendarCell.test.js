import React from "react";
import CalendarCell from "./CalendarCell";
import {render, screen} from "@testing-library/react";
import {CALENDAR_DISPLAY_TYPE} from "../../../types/settings";
import {getCurrentShortTimestamp} from "../../../services/utilityService";


jest.mock('../../../services/utilityService', () => ({
    getCurrentShortTimestamp: jest.fn()
}));


describe('CalendarCell', () => {

    const activities = [
        {id: 1, name: 'test activity 1', completed: true, style: {color: '#FFF'}},
        {id: 2, name: 'test activity 2', completed: true, style: {color: '#EBB'}},
        {id: 3, name: 'test activity 3', completed: true, style: {color: '#FAF'}},
    ];

    beforeEach(() => {
        getCurrentShortTimestamp.mockImplementation(() => '2020-09-01');
    })

    it('should show timestamp and activities', () => {
        render(<CalendarCell key={1} timestamp={'2012-12-21'} activities={activities} displayType={CALENDAR_DISPLAY_TYPE.GRID}/>);
        screen.getByText('21');
        expect(screen.getAllByRole('listitem').length).toBe(3);
    })

    it('should display activity name if list view ', () => {
        render(<CalendarCell key={1} timestamp={'2012-12-21'} activities={activities} displayType={CALENDAR_DISPLAY_TYPE.LIST}/>);
        screen.getByText('test activity 1')
        screen.getByText('test activity 2')
        screen.getByText('test activity 3')
    });

    it('should not display activity name if grid view ', () => {
        render(<CalendarCell key={1} timestamp={'2012-12-21'} activities={activities} displayType={CALENDAR_DISPLAY_TYPE.GRID}/>);
        expect(screen.queryByText('test activity 1')).toBeFalsy();
        expect(screen.queryByText('test activity 2')).toBeFalsy();
        expect(screen.queryByText('test activity 3')).toBeFalsy();
    });

    it('should not highlight cell if current timestamp', () => {
        let wrapper = render(<CalendarCell key={1} timestamp={'2012-12-21'} activities={activities} displayType={CALENDAR_DISPLAY_TYPE.GRID}/>);
        expect(wrapper.container.firstChild).not.toHaveClass('calendar-cell--highlight')

        wrapper = render(<CalendarCell key={1} timestamp={'2020-09-01'} activities={activities} displayType={CALENDAR_DISPLAY_TYPE.GRID}/>);
        expect(wrapper.container.firstChild).toHaveClass('calendar-cell--highlight')
    });
});


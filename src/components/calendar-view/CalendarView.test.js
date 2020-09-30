import {render, screen} from "@testing-library/react";
import React from "react";
import {useDispatch} from "react-redux";
import {ASYNC_STATE_STATUS} from "../../redux/asyncStateStatus";
import CalendarView from "./CalendarView";
import UtilityService from "../../services/utilityService";
import {fireEvent} from "@testing-library/dom";
import {CALENDAR_DISPLAY_TYPE} from "../../types/settings";

const mockState = {};
const mockData = {};
const mockDataLog = [{
        year: '2020',
        data: [
            {
                month: '11',
                data: [
                    {
                        timestamp: '2020-11-31',
                        activities: []
                    },
                    {
                        timestamp: '2020-11-10',
                        activities: [{id: 999, name: 'c', style: {}}]
                    }
                ]
            },
            {
                month: '4',
                data: [
                    {
                        timestamp: '2020-04-31',
                        activities: []
                    },
                    {
                        timestamp: '2020-04-15',
                        activities: [{id: 999, name: 'b', style: {}}]
                    }
                ]
            }
        ]
    },
    {
        year: '2010',
        data: [
            {
                month: '11',
                data: [
                    {
                        timestamp: '2010-11-30',
                        activities: []
                    },
                    {
                        timestamp: '2010-11-02',
                        activities: [{id: 123456, name: 'a', style: {}}]
                    }
                ],
            }
        ]
    }
];

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(() => {}),
    useSelector: jest.fn((callback) => {
        return callback(mockState)}),
}));

jest.mock("../../redux/slices/logEntriesSlice", () => ({
    getCalendarDataLog: args => mockData.dataLog
}));

jest.mock("../../redux/slices/activitiesSlice", () => ({
    getAllActivities: args => []
}));

jest.mock("../../redux/slices/settingsSlice", () => ({
    updateSettings: args => args,
    getSettings: args => mockData.settings
}));

describe('CalendarView', () => {

    const dispatchSpy = jest.fn();

    beforeEach(() => {
        useDispatch.mockReturnValue(dispatchSpy);
        Object.assign(mockState, {
            logEntries: {timestamp: '2020-09-21', status: ASYNC_STATE_STATUS.IDLE},
            activities: {data: [], status: ASYNC_STATE_STATUS.IDLE}
        });
        Object.assign(
            mockData,
            {
                settings: {calendarDisplayType: CALENDAR_DISPLAY_TYPE.GRID},
                dataLog: UtilityService.deepCopy(mockDataLog)
            });
    });

    describe('it should not display no data found message', () => {

        it('when loading state is not succeeded', () => {
            render(<CalendarView/>);
            expect(screen.queryByText('No data have been found!')).toBeFalsy();
        });

        it('when only log entries loading state is succeeded', () => {
            Object.assign(mockState, {
                logEntries: {status: ASYNC_STATE_STATUS.SUCCEEDED},
                activities: {status: ASYNC_STATE_STATUS.IDLE}
            });
            render(<CalendarView/>);
            expect(screen.queryByText('No data have been found!')).toBeFalsy();
        });

        it('when only activities loading state is succeeded', () => {
            Object.assign(mockState, {
                logEntries: {status: ASYNC_STATE_STATUS.IDLE},
                activities: {status: ASYNC_STATE_STATUS.SUCCEEDED}
            });
            render(<CalendarView/>);
            expect(screen.queryByText('No data have been found!')).toBeFalsy();
        });

        it('when loading state is succeeded but have data', () => {
            Object.assign(mockState, {
                logEntries: {status: ASYNC_STATE_STATUS.SUCCEEDED},
                activities: {status: ASYNC_STATE_STATUS.SUCCEEDED}
            });
            render(<CalendarView/>);
            expect(screen.queryByText('No data have been found!')).toBeFalsy();
        });
    });

    it('should display no data found message', () => {
        Object.assign(mockData, {dataLog: []});
        render(<CalendarView/>);
    });

    it('should dispatch calendar display toggle', () => {
        render(<CalendarView/>);
        const button = screen.queryByRole('button', {name: 'Calendar grid display'});
        fireEvent.click(button);
        expect(dispatchSpy).toHaveBeenCalledWith({calendarDisplayType: CALENDAR_DISPLAY_TYPE.LIST});
    });

});

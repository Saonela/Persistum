import {useDispatch} from "react-redux";
import {render, screen} from "@testing-library/react";
import React from "react";
import StatisticsView from "./StatisticsView";
import {ASYNC_STATE_STATUS} from "../../redux/asyncStateStatus";
import {CALENDAR_DISPLAY_TYPE} from "../../types/settings";
import {BrowserRouter as Router} from "react-router-dom";


const mockState = {};

const activities = [
    {
        id: 123456,
        name: 'Read 5 pages',
        completed: false,
        style: ''
    },
    {
        id: 999,
        name: 'Workout 30 minutes',
        completed: false,
        style: ''
    }
];

const logEntries = [
    {
        timestamp: '2010-11-02',
        activities: [123456]
    },
    {
        timestamp: '2020-04-05',
        activities: [999]
    }
];

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(() => {
    }),
    useSelector: jest.fn((callback) => {
        return callback(mockState)
    }),
}));


describe('StatisticsView', () => {

    const dispatchSpy = jest.fn();

    beforeEach(() => {
        useDispatch.mockReturnValue(dispatchSpy);
        Object.assign(mockState, {
            logEntries: {timestamp: '2020-09-21', data: logEntries, status: ASYNC_STATE_STATUS.IDLE},
            activities: {data: activities, status: ASYNC_STATE_STATUS.IDLE},
            settings: {data: {calendarDisplayType: CALENDAR_DISPLAY_TYPE.LIST}}
        });
    });

    it('should show statistic panels', () => {
        render(<Router><StatisticsView/></Router>);
        screen.getByText('Overall');
        screen.getByText('Time Period');
    });

    it('should hide statistic panels and show message if no statistics', () => {
        Object.assign(mockState, {
            logEntries: {timestamp: '2020-09-21', data: [], status: ASYNC_STATE_STATUS.LOADING},
            activities: {data: activities, status: ASYNC_STATE_STATUS.IDLE},
            settings: {data: {calendarDisplayType: CALENDAR_DISPLAY_TYPE.LIST}}
        });
        const {rerender} = render(<Router><StatisticsView/></Router>);
        expect(screen.queryByText('Overall')).not.toBeInTheDocument();
        expect(screen.queryByText('Time Period')).not.toBeInTheDocument();
        expect(screen.queryByText('No data have been found!')).not.toBeInTheDocument();

        Object.assign(mockState, {
            logEntries: {timestamp: '2020-09-21', data: [], status: ASYNC_STATE_STATUS.SUCCEEDED},
            activities: {data: activities, status: ASYNC_STATE_STATUS.SUCCEEDED}
        });
        rerender(<Router><StatisticsView/></Router>);
        screen.getByText('No data have been found!');
    });
});

import React from "react";
import FormView from "./FormView";
import {cleanup, render, screen} from "@testing-library/react";
import {ASYNC_STATE_STATUS} from "../../redux/asyncStateStatus";
import {getCurrentShortTimestamp} from "../../services/utilityService";
import {useDispatch} from "react-redux";

const mockState = {};

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(() => {}),
    useSelector: jest.fn((callback) => {
        return callback(mockState)}),
}));

jest.mock("../../redux/slices/logEntriesSlice", () => ({
    getTimestamp: args => mockState.logEntries.timestamp,
    resetTimestamp: args => args,
    getLoggedActivityIds: args => args,
    toggleLogEntryActivity: args => args,
    updateLogEntry: args => args
}));

jest.mock('react-transition-group', () => {
    const FakeTransition = jest.fn(({ children }) => children)
    const FakeCSSTransition = jest.fn(props => {
        return <FakeTransition>{props.children}</FakeTransition>}
    )
    return { CSSTransitionGroup: FakeCSSTransition, Transition: FakeTransition };
});

jest.mock('react-beautiful-dnd', () => ({
    Droppable: ({ children }) => children({
        draggableProps: {
            style: {},
        },
        innerRef: jest.fn(),
    }, {}),
    Draggable: ({ children }) => children({
        draggableProps: {
            style: {},
        },
        innerRef: jest.fn(),
    }, {}),
    DragDropContext: ({ children }) => children,
}));

jest.mock('../../services/utilityService', () => ({
    getCurrentShortTimestamp: jest.fn()
}));


describe('FormView', () => {

    beforeEach(() => {
        useDispatch.mockReturnValue(jest.fn());
        Object.assign(mockState, {
            logEntries: {timestamp: '2020-09-21'},
            activities: {data: [], status: ASYNC_STATE_STATUS.IDLE}
        });
    });

    it('should hide no activities message and show "call it a day" button', () => {
        const {queryByTestId, getByRole} = render(<FormView/>);
        expect(queryByTestId('no-activities')).toBeFalsy();
        getByRole('button', {name: 'complete-day-logging'});
    });

    it('should show no activities message and hide "call it a day" button', () => {
        Object.assign(mockState, {
            activities: {data: [], status: ASYNC_STATE_STATUS.SUCCEEDED}
        });
        const {getByTestId, queryByRole} = render(<FormView/>);
        getByTestId('no-activities');
        expect(queryByRole('button', {name: 'complete-day-logging'})).toBeFalsy();
    });

    it('should add edit class if not current date timestamp', () => {
        getCurrentShortTimestamp.mockImplementation(() => '2020-09-21');
        render(<FormView/>);
        expect(screen.queryByText('You are not on the current date'));
        getCurrentShortTimestamp.mockImplementation(() => '2020-09-20');
        cleanup();
        render(<FormView/>);
        screen.getByText('You are not on the current date');
    });
});

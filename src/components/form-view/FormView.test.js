import React from "react";
import FormView from "./FormView";
import {render} from "@testing-library/react";
import {ASYNC_STATE_STATUS} from "../../redux/asyncStateStatus";

const mockState = {};

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(() => {}),
    useSelector: jest.fn((callback) => {
        return callback(mockState)}),
}));

jest.mock("../../redux/slices/logEntriesSlice", () => ({
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

describe('FormView', () => {

    beforeEach(() => {
        Object.assign(mockState, {activities: {data: [], status: ASYNC_STATE_STATUS.IDLE}});
    });

    it('should hide no activities message and show "call it a day" button', () => {
        const {queryByTestId, getByRole} = render(<FormView/>);
        expect(queryByTestId('no-activities')).toBeFalsy();
        getByRole('button', {name: 'complete-day-logging'});
    });

    it('should show no activities message and hide "call it a day" button', () => {
        Object.assign(mockState, {activities: {data: [], status: ASYNC_STATE_STATUS.SUCCEEDED}})
        const {getByTestId, queryByRole} = render(<FormView/>);
        getByTestId('no-activities');
        expect(queryByRole('button', {name: 'complete-day-logging'})).toBeFalsy();
    });
});

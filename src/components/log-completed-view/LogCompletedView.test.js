import LogCompletedView from "./LogCompletedView";
import {render} from "@testing-library/react";
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";

const mockState = {};

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(() => {}),
    useSelector: jest.fn((callback) => {
        return callback(mockState)}),
}));

jest.mock("../../redux/slices/logEntriesSlice", () => ({
    getTimestamp: args => '2020-09-19',
}));

it('should match snapshot', () => {
    const {asFragment} = render(<Router><LogCompletedView/></Router>);
    expect(asFragment()).toMatchSnapshot();
});

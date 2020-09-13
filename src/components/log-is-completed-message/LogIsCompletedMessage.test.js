import LogIsCompletedMessage from "./LogIsCompletedMessage";
import {render} from "@testing-library/react";
import {fireEvent, getByText} from "@testing-library/dom";
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";

it('should emit event on go back button click', () => {
    const spy = jest.fn();
    const {container} = render(<Router><LogIsCompletedMessage date={'2020'} onBack={spy}/></Router>);
    const button = getByText(container, 'Back to logging');
    fireEvent.click(button);
    expect(spy).toHaveBeenCalled();
});

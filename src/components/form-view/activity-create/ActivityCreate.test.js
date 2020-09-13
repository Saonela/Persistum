import React from "react";
import ActivityCreate from "./ActivityCreate";
import {getByLabelText, getByTitle, queryByLabelText} from "@testing-library/dom";
import {fireEvent, render} from "@testing-library/react";

describe('ActivityCreate', () => {

    let container;
    let submitSpy;
    let input;

    beforeEach(() => {
        submitSpy = jest.fn();
        const element = render(<ActivityCreate onSubmit={submitSpy}/>);
        container = element.container;
    });

    it('should toggle text-input', async () => {
        clickAddButton(container);
        input = getByLabelText(container, 'Activity');
        fireEvent.blur(input);
        expect(queryByLabelText(container, 'Activity')).toBeFalsy();
    });

    it('should always show text-input if force', () => {
        let {container} = render(<ActivityCreate forceInputDisplay={true} onClick={submitSpy}/>);
        input = getByLabelText(container, 'Activity');
        clickAddButton(container);
        input = getByLabelText(container, 'Activity');
    });

    it('should emit name on enter', async () => {
        clickAddButton(container);
        input = getByLabelText(container,'Activity');
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
        expect(submitSpy).not.toHaveBeenCalled();

        fireEvent.change(input, {target: {value: '123'}});
        fireEvent.keyPress(input, { key: 'Enter', charCode: 13 });
        expect(submitSpy).toHaveBeenCalledWith('123');
    });

    it('should submit on toggle click', () => {
        clickAddButton(container);
        input = getByLabelText(container,'Activity');
        fireEvent.change(input, {target: {value: '56'}});
        fireEvent.blur(input);
        clickAddButton(container);
        expect(submitSpy).toHaveBeenCalledWith('56');
        expect(queryByLabelText(container,'Activity')).toBeFalsy();
    });

    const clickAddButton = (container) => {
        const button = getByTitle(container, 'Add');
        fireEvent.click(button);
    }
});

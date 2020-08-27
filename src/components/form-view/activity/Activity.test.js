import React from 'react';
import Activity from "./Activity";
import {
    getByDisplayValue,
    getByRole,
    getByText,
    queryByDisplayValue,
    queryByText
} from "@testing-library/dom";
import {fireEvent, render} from "@testing-library/react";

describe('Activity', () => {

    let container;
    let onChangeSpy;
    let onToggleSpy;

    beforeEach(() => {
        onChangeSpy = jest.fn();
        onToggleSpy = jest.fn();
        const element = render(<Activity activity={{id: 1, name: 'test activity'}} completed={false} onToggle={onToggleSpy} onChange={onChangeSpy}/>);
        container = element.container;
    });

    it('should show activity data', () => {
        getByText(container, 'test activity');
    });

    it('should show indicator if completed', () => {
        const {getByRole} = render(<Activity activity={{id: 1}} completed={true}/>);
        getByRole('alert');
    });

    it('should emit activity completion state on click', () => {
        const activity = getByRole(container, 'listitem');
        fireEvent.click(activity);
        expect(onToggleSpy).toHaveBeenCalledWith();
    });

    it('should toggle name text-input on edit event', () => {
        const editButton = getByRole(container, 'button', {name: /edit/i});
        fireEvent.click(editButton);
        getByDisplayValue(container, 'test activity');
        expect(queryByText(container, 'test activity')).toBeFalsy();
    });

    it('should edit activity name on blur and hide text-input', () => {
        const editButton = getByRole(container, 'button', {name: /edit/i});
        fireEvent.click(editButton);
        const input = getByDisplayValue(container,'test activity');
        fireEvent.change(input, {target: {value: 'My test activity!'}});
        fireEvent.blur(input);
        getByText(container, 'test activity')
        expect(queryByDisplayValue(container, 'test activity')).toBeFalsy();
        expect(onChangeSpy).toHaveBeenCalledWith({id: 1, name: 'My test activity!'});
    });

});

import React from 'react';
import ActivityControls from "./ActivityControls";
import {render} from "@testing-library/react";
import {fireEvent, getByRole} from "@testing-library/dom";

describe('ActivityControls', () => {

    let container;
    let onEditSpy;
    let onDeleteSpy;

    beforeEach(() => {
        onEditSpy = jest.fn();
        onDeleteSpy = jest.fn();
        const element = render(<ActivityControls onEdit={onEditSpy} onDelete={onDeleteSpy}/>);
        container = element.container;
    });

    it('should emit event on edit', () => {
        const button = getByRole(container, 'button', {name: /edit/i});
        fireEvent.click(button);
        expect(onEditSpy).toHaveBeenCalled();
    });

    it('should emit event on remove', () => {
        const button = getByRole(container, 'button', {name: /delete/i});
        fireEvent.click(button);
        expect(onDeleteSpy).toHaveBeenCalled();
    })

});

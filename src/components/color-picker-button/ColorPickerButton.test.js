import {render, screen} from "@testing-library/react";
import ActivityControls from "../form-view/activity-controls/ActivityControls";
import React from "react";
import ColorPickerButton from "./ColorPickerButton";
import {fireEvent} from "@testing-library/dom";


describe('ActivityControls', () => {

    let onChangeSpy;

    beforeEach(() => {
        onChangeSpy = jest.fn();
    });

    it('should toggle color picker', () => {
        render(<ColorPickerButton color={'#ffddbb'} onChange={onChangeSpy}/>);
        expect(screen.getByTestId('color-picker-trigger-visual')).toHaveStyle({backgroundColor: '#ffddbb'});
        expect(screen.queryByTestId('color-picker')).toBeFalsy();
        const button = screen.getByRole('button', {name: 'Toggle color picker'});
        fireEvent.click(button);
        screen.getByTestId('color-picker');
        fireEvent.click(screen.getByTitle('#FF6900'));
        expect(onChangeSpy).toHaveBeenCalledWith('#ff6900');
    });

});

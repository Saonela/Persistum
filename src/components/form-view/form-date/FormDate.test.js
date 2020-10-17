import {render, screen} from "@testing-library/react";
import React from "react";
import FormDate from "./FormDate";
import {fireEvent} from "@testing-library/dom";

describe('FormDate', () => {

    it('should display date', () => {
        render(<FormDate date={'2020-09-01'}/>);
        screen.getByText('Tuesday 01');
        screen.getByText('September');
        screen.getByText('2020');
    });

    it('should emit date change', () => {
        const spy = jest.fn();
        render(<FormDate date={'2020-09-01'} setDate={spy}/>);
        expect(screen.queryByRole('button', {name: 'Choose Wednesday, September 2nd, 2020'})).toBeFalsy();
        fireEvent.click(screen.getByRole('button', {name: 'Edit date'}));
        fireEvent.click(screen.getByRole('button', {name: 'Choose Wednesday, September 2nd, 2020'}));
        expect(spy).toHaveBeenCalledWith('2020-09-02');
    });

    it('should disable and hide button', () => {
        render(<FormDate date={'2020-09-01'} disabled/>);
        expect(screen.queryByRole('button', {name: 'Edit date'})).toBeFalsy();
    });

});

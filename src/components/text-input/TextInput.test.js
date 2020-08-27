import React from "react";
import TextInput from "./TextInput";
import {render} from "@testing-library/react";
import {fireEvent, getByDisplayValue, getByLabelText} from "@testing-library/dom";

describe('TextInput', () => {

    let container;
    let onEnterSpy;
    let onBlurSpy;

    beforeEach(() => {
        onEnterSpy = jest.fn();
        onBlurSpy = jest.fn();
        const wrapper = render(<TextInput id={'text'} value={'Prop Value'} label={'Text Input'} onBlur={onBlurSpy} onEnter={onEnterSpy}/>)
        container = wrapper.container;
    });

    it('should display given label and value', () => {
        getByLabelText(container, 'Text Input');
        getByDisplayValue(container, 'Prop Value');
    });

    it('should emit event on enter', () => {
        const input = getByLabelText(container, 'Text Input');
        fireEvent.input(input, {target: {value: 'abc123'}});
        fireEvent.keyPress(input, { key: 'Enter', code: 'enter', charCode: 13 });
        expect(onEnterSpy).toHaveBeenCalledWith('abc123');
    });

    it('should emit event on blur', () => {
        const input = getByLabelText(container, 'Text Input');
        fireEvent.input(input, {target: {value: 'abc123'}});
        fireEvent.blur(input);
        expect(onBlurSpy).toHaveBeenCalledWith('abc123');
    });
});

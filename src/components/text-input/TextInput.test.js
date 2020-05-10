import React from "react";
import {shallow} from "enzyme";
import TextInput from "./TextInput";

describe('TextInput', () => {
    let wrapper;
    let onEnterSpy;
    let onBlurSpy;
    let input;

    beforeEach(() => {
        onEnterSpy = jest.fn();
        onBlurSpy = jest.fn();
        wrapper = shallow(<TextInput label={'Input:'} value={'Prop Value'} onBlur={onBlurSpy} onEnter={onEnterSpy}/>);
        input = wrapper.find('.text-input');
    });

    it('should display given label and value', () => {
        expect(input.props().label).toBe('Input:');
        expect(input.props().value).toBe('Prop Value');
    });

    it('should emit event on enter', () => {
        input.simulate('change', {target: {value:  'My name is Cena' }});
        input.simulate('keypress', {key: 'a', target: {value:  'My name is Cena' }});
        expect(onEnterSpy).not.toHaveBeenCalled();
        input.simulate('keypress', {key: 'Enter', target: {value:  'My name is Cena' }});
        expect(onEnterSpy).toHaveBeenCalledWith('My name is Cena');

    });

    it('should emit event on blur', () => {
        input.simulate('change', {target: {value:  'My name is Cena' }});
        input.simulate('blur');
        expect(onBlurSpy).toHaveBeenCalledWith('My name is Cena');
    });
});

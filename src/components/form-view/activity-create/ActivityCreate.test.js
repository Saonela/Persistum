import React from "react";
import {shallow} from "enzyme";
import ActivityCreate from "./ActivityCreate";

describe('ActivityCreate', () => {
    let wrapper;
    let onSubmit;
    let input;

    beforeEach(() => {
        onSubmit = jest.fn();
        wrapper = shallow(<ActivityCreate onSubmit={onSubmit}/>);
        wrapper.setState({showInput: true});
        input = getInput();
    });

    it('should toggle text-input', () => {
        expect(input.length).toBeTruthy();
        wrapper.find('.form-create__toggle-button').simulate('click');
        expect(getInput().length).toBeFalsy();
    });

    it('should always show text-input if force', () => {
        wrapper = shallow(<ActivityCreate forceInputDisplay={true} onClick={onSubmit}/>);
        expect(input.length).toBeTruthy();
        wrapper.find('.form-create__toggle-button').simulate('click');
        expect(input.length).toBeTruthy();
    });

    it('should emit name on enter', () => {
        input.props().onEnter('');
        expect(onSubmit).not.toHaveBeenCalled();
        input.props().onEnter('123');
        expect(onSubmit).toHaveBeenCalledWith('123');
        expect(getInput().length).toBeFalsy();
    });

    it('should submit on toggle click', () => {
        input.props().onBlur('56');
        wrapper.find('.form-create__toggle-button').simulate('click');
        expect(onSubmit).toHaveBeenCalledWith('56');
        expect(getInput().length).toBeFalsy();
    });

    const getInput = () => {
        return wrapper.find('.form-create__input');
    }
});

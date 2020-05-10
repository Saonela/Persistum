import React from 'react';
import {shallow} from "enzyme";
import ActivityControls from "./ActivityControls";

describe('ActivityControls', () => {
    let wrapper;
    let onEditSpy;
    let onRemoveSpy;

    beforeEach(() => {
        onEditSpy = jest.fn();
        onRemoveSpy = jest.fn();
        wrapper = shallow(<ActivityControls onEdit={onEditSpy} onRemove={onRemoveSpy}/>);
    });

    it('should emit event on edit', () => {
        const button = wrapper.find('.activity-controls__edit-button');
        button.simulate('click', { stopPropagation() {} });
        expect(onEditSpy).toHaveBeenCalled();
    });

    it('should emit event on remove', () => {
        const button = wrapper.find('.activity-controls__remove-button');
        button.simulate('click', { stopPropagation() {} });
        expect(onRemoveSpy).toHaveBeenCalled();
    })

});

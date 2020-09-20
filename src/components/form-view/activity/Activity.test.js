import React from 'react';
import Activity from "./Activity";
import {
    getByDisplayValue,
    getByRole, getByTestId,
    getByText, queryByDisplayValue,
    queryByRole, queryByText,
} from "@testing-library/dom";
import {fireEvent, render} from "@testing-library/react";

jest.mock('react-transition-group', () => {
    const FakeTransition = jest.fn(({ children }) => children)
    const FakeCSSTransition = jest.fn(props => {
        return <FakeTransition>{props.children}</FakeTransition>}
    )
    return { CSSTransitionGroup: FakeCSSTransition, Transition: FakeTransition };
});

describe('Activity', () => {

    let container;
    let onUpdateSpy;
    let onToggleSpy;

    beforeEach(() => {
        onUpdateSpy = jest.fn();
        onToggleSpy = jest.fn();
        const element = render(<Activity activity={{id: 1, name: 'test activity', style: {background: '#ffffff'}}}
                                         completed={false}
                                         onToggle={onToggleSpy}
                                         onUpdate={onUpdateSpy}/>);
        container = element.container;
    });

    it('should show activity data', () => {
        getByText(container, 'test activity');
    });

    it('should show indicator if completed', () => {
        const {getByRole} = render(<Activity activity={{id: 1}} completed={true}/>);
        getByRole('alert', {name: 'Done'});
    });

    it('should emit activity completion state on click', () => {
        fireEvent.click(getByTestId(container, 'activity-click-area'));
        expect(onToggleSpy).toHaveBeenCalledWith();
    });

    it('should ignore toggle on activity controls expand', () => {
        expect(queryByRole(container, 'button', {name: 'edit'})).toBeFalsy();
        const expandButton = getByRole(container, 'button', {name: 'Expand activity controls'});
        fireEvent.click(expandButton);
        expect(onToggleSpy).not.toHaveBeenCalled();
    });

    it('should toggle name text-input on edit event', () => {
        const expandButton = TestHelper.getExpandControlsButton()
        fireEvent.click(expandButton);
        const editButton = TestHelper.getEditButton();
        fireEvent.click(editButton);
        getByDisplayValue(container, 'test activity');
        expect(queryByText(container, 'test activity')).toBeFalsy();
    });

    it('should edit activity name on blur and hide text-input', () => {
        const expandButton = TestHelper.getExpandControlsButton()
        fireEvent.click(expandButton);
        const editButton = TestHelper.getEditButton();
        fireEvent.click(editButton);
        const input = getByDisplayValue(container,'test activity');
        fireEvent.change(input, {target: {value: 'My test activity!'}});
        fireEvent.blur(input);
        getByText(container, 'test activity')
        expect(queryByDisplayValue(container, 'test activity')).toBeFalsy();
        expect(onUpdateSpy).toHaveBeenCalledWith({id: 1, name: 'My test activity!', style: {background: '#ffffff'}});
    });

    const TestHelper = {
        getEditButton: () => {
            return getByRole(container, 'button', {name: /edit/i});
        },
        getExpandControlsButton: () => {
            return getByRole(container, 'button', {name: 'Expand activity controls'});
        }
    }
});

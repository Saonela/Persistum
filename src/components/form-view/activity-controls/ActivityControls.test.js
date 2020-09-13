import React from 'react';
import ActivityControls from "./ActivityControls";
import {render} from "@testing-library/react";
import {
    fireEvent,
    getByRole,
    queryByRole,
} from "@testing-library/dom";

jest.mock('react-transition-group', () => {
    const FakeTransition = jest.fn(({ children }) => children)
    const FakeCSSTransition = jest.fn(props => {
        return <FakeTransition>{props.children}</FakeTransition>}
    )
    return { CSSTransitionGroup: FakeCSSTransition, Transition: FakeTransition };
});

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

    it('should expand activity controls', () => {
        TestHelper.expectControlsToBeHidden();
        const expandButton = TestHelper.getExpandButton()
        fireEvent.click(expandButton);
        TestHelper.getEditButton();
        TestHelper.getDeleteButton();
        fireEvent.click(expandButton);
        TestHelper.expectControlsToBeHidden();
    });


    it('should emit event and close controls on edit', () => {
        const expandButton = TestHelper.getExpandButton()
        fireEvent.click(expandButton);
        const button = TestHelper.getEditButton();
        fireEvent.click(button);
        expect(onEditSpy).toHaveBeenCalled();
        TestHelper.expectControlsToBeHidden();
    });

    it('should emit event and close controls on remove', () => {
        const expandButton = TestHelper.getExpandButton()
        fireEvent.click(expandButton);
        const button = TestHelper.getDeleteButton();
        fireEvent.click(button);
        expect(onDeleteSpy).toHaveBeenCalled();
        TestHelper.expectControlsToBeHidden();
    });

    const TestHelper = {
        getEditButton: () => {
            return getByRole(container, 'button', {name: /edit/i});
        },
        getDeleteButton: () => {
            return getByRole(container, 'button', {name: /delete/i});
        },
        getExpandButton: () => {
            return getByRole(container, 'button', {name: 'Expand activity controls'});
        },
        expectControlsToBeHidden: () => {
            expect(queryByRole(container, 'button', {name: 'edit'})).toBeFalsy();
            expect(queryByRole(container, 'button', {name: 'delete'})).toBeFalsy();
        }
    }

});

import React from 'react';
import LegendItem from "./LegendItem";
import {render} from "@testing-library/react";
import {fireEvent, getByRole, getByText} from "@testing-library/dom";

describe('LegendItem', () => {

    let container;
    let onToggleSpy;

    beforeEach(() => {
        onToggleSpy = jest.fn();
        const element = render(
            <LegendItem activity={{id: 123456, name: 'Learn redux', style: {background: '#ebebeb'}}}
                        isActive={false}
                        onToggle={onToggleSpy}/>
        );
        container = element.container;
    });

    it('should display legend items', () => {
        const text = getByText(container, 'Learn redux');
        expect(getByRole(container, 'img')).toHaveStyle('background-color: #ebebeb');
        fireEvent.click(text);
        expect(onToggleSpy).toHaveBeenCalled();
    });
});

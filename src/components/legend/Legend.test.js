import React from 'react';
import Legend from "./Legend";
import {render} from "@testing-library/react";
import {getAllByRole} from "@testing-library/dom";

describe('Legend', () => {

    let container;

    const activities = [
        {id: 123456, name: 'Learn redux', style: {background: '#ebebeb'}},
        {id: 999, name: 'Read a book', style: {background: 'red'}}
    ];

    beforeEach(() => {
        const element = render(<Legend activities={activities} filters={[]}/>);
        container = element.container;
    });

    it('should display legend items', () => {
        expect(getAllByRole(container, 'listitem').length).toBe(2);
    });

    it('should mark filtered items', () => {
        const {container} = render(<Legend activities={activities} filters={[999]}/>);
        expect(getAllByRole(container, 'img')[1]).toHaveStyle(`background-color: ${activities[1].style.background}`);
    });
});

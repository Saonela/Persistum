import React from "react";
import LogCell from "./LogCell";
import {render} from "@testing-library/react";
import {getAllByRole, getByText} from "@testing-library/dom";

describe('LogCell', () => {

    let container;

    const activities = [
        {id: 1, name: 'test activity 1', completed: true, style: {color: '#FFF'}},
        {id: 2, name: 'test activity 2', completed: true, style: {color: '#EBB'}},
        {id: 3, name: 'test activity 3', completed: true, style: {color: '#FAF'}},
    ]

    beforeEach(() => {
        const element = render(<LogCell key={1} timestamp={'2012-12-21'} activities={activities}/>);
        container = element.container;
    });

    it('should show timestamp and activities', () => {
        getByText(container, '21');
        expect(getAllByRole(container, 'listitem').length).toBe(3);
    })
});

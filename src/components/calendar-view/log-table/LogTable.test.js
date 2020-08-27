import React from "react";
import LogTable from "./LogTable";
import {render} from "@testing-library/react";
import {getAllByRole} from "@testing-library/dom";

describe('LogTable', () => {

    let container;

    const dataLog = [
        {
            year: '2010',
            data: [
                {
                    month: '11',
                    data: [
                        {
                            timestamp: '2010-11-02',
                            activities: [{id: 123456, name: 'a', style: {}}]
                        }
                    ]
                }
            ]
        },
        {
            year: '2020',
            data: [
                {
                    month: '4',
                    data: [
                        {
                            timestamp: '2020-04-15',
                            activities: [{id: 999, name: 'b', style: {}}]
                        }
                    ]
                },
                {
                    month: '11',
                    data: [
                        {
                            timestamp: '2020-11-10',
                            activities: [{id: 999, name: 'c', style: {}}]
                        }
                    ]
                }
            ]
        },
    ];

    beforeEach(() => {
        const element = render(<LogTable dataLog={dataLog}/>);
        container = element.container;
    });

    it('should display log cells', () => {
        expect(getAllByRole(container, 'listitem', {name: 'Activity'}).length).toBe(3);
    })
});

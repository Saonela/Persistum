import React from "react";
import LogTable from "./LogTable";
import {render} from "@testing-library/react";
import {within} from "@testing-library/dom";

describe('LogTable', () => {

    const dataLog = [
        {
            year: '2020',
            data: [
                {
                    month: '11',
                    data: [
                        {
                            timestamp: '2020-11-31',
                            activities: []
                        },
                        {
                            timestamp: '2020-11-10',
                            activities: [{id: 999, name: 'c', style: {}}]
                        }
                    ]
                },
                {
                    month: '4',
                    data: [
                        {
                            timestamp: '2020-04-31',
                            activities: []
                        },
                        {
                            timestamp: '2020-04-15',
                            activities: [{id: 999, name: 'b', style: {}}]
                        }
                    ]
                }
            ]
        },
        {
            year: '2010',
            data: [
                {
                    month: '11',
                    data: [
                        {
                            timestamp: '2010-11-30',
                            activities: []
                        },
                        {
                            timestamp: '2010-11-02',
                            activities: [{id: 123456, name: 'a', style: {}}]
                        }
                    ],
                }
            ]
        }
    ];

    it('should display log cells', () => {
        const {getAllByRole} = render(<LogTable dataLog={dataLog}/>);
        expect(getAllByRole('listitem', {name: 'Activity'}).length).toBe(3);
    });

    it('should add placeholder tiles by last months day weekday', () => {
        let {queryByTestId} = render(<LogTable dataLog={dataLog}/>);
        let year = queryByTestId('year-2010');
        let yearTestUtils = within(year)
        let month = yearTestUtils.queryByTestId('month-11');
        let monthTestUtils = within(month)
        expect(monthTestUtils.queryAllByTestId('day-placeholder').length).toBe(5);

        year = queryByTestId('year-2020');
        yearTestUtils = within(year)
        month = yearTestUtils.queryByTestId('month-4');
        monthTestUtils = within(month)
        expect(monthTestUtils.queryAllByTestId('day-placeholder').length).toBe(0);
    });
});

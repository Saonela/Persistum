import React from "react";
import Calendar from "./Calendar";
import {render, screen} from "@testing-library/react";
import {within} from "@testing-library/dom";
import {CALENDAR_DISPLAY_TYPE} from "../../../types/settings";

describe('Calendar', () => {

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

    const smallDataLog = [{
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
    }];

    it('should display log cells', () => {
        render(<Calendar dataLog={dataLog} displayType={CALENDAR_DISPLAY_TYPE.GRID}/>);
        expect(screen.getAllByRole('listitem', {name: 'Activity'}).length).toBe(3);
    });

    it('should add placeholder tiles by last months day weekday', () => {
        render(<Calendar dataLog={dataLog} displayType={CALENDAR_DISPLAY_TYPE.GRID}/>);
        let year = screen.queryByTestId('year-2010');
        let yearTestUtils = within(year)
        let month = yearTestUtils.queryByTestId('month-11');
        let monthTestUtils = within(month)
        expect(monthTestUtils.queryAllByTestId('day-placeholder').length).toBe(5);

        year = screen.queryByTestId('year-2020');
        yearTestUtils = within(year)
        month = yearTestUtils.queryByTestId('month-4');
        monthTestUtils = within(month)
        expect(monthTestUtils.queryAllByTestId('day-placeholder').length).toBe(0);
    });

    it('display weekdays header if grid view', () => {
        render(<Calendar dataLog={smallDataLog} displayType={CALENDAR_DISPLAY_TYPE.GRID}/>);
        screen.getByText('Monday');
        screen.getByText('Wednesday');
        screen.getByText('Friday');
        screen.getByText('Sunday');
    });

    it('display hide weekdays header if list view', () => {
        render(<Calendar dataLog={smallDataLog} displayType={CALENDAR_DISPLAY_TYPE.LIST}/>);
        expect(screen.queryByText('Monday')).not.toBeInTheDocument();
        expect(screen.queryByText('Wednesday')).not.toBeInTheDocument();
        expect(screen.queryByText('Friday')).not.toBeInTheDocument();
        expect(screen.queryByText('Sunday')).not.toBeInTheDocument();
    });
});

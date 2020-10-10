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
                            activities: [999]
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
                            activities: [999]
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
                            activities: [123456]
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
                        activities: [123456]
                    }
                ],
            }
        ]
    }];

    const activitiesMap = {
        999: {id: 999, name: 'b', style: {}},
        123456: {id: 123456, name: 'a', style: {}}
    };

    it('should display log cells', () => {
        render(<Calendar activitiesMap={activitiesMap} dataLog={dataLog} displayType={CALENDAR_DISPLAY_TYPE.GRID}/>);
        expect(screen.getAllByRole('img', {name: 'Activity color'}).length).toBe(3);
    });

    it('should add placeholder tiles by last months day weekday', () => {
        render(<Calendar activitiesMap={activitiesMap} dataLog={dataLog} displayType={CALENDAR_DISPLAY_TYPE.GRID}/>);
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
        render(<Calendar activitiesMap={activitiesMap} dataLog={smallDataLog} displayType={CALENDAR_DISPLAY_TYPE.GRID}/>);
        screen.getByText('Monday');
        screen.getByText('Wednesday');
        screen.getByText('Friday');
        screen.getByText('Sunday');
    });

    it('display hide weekdays header if list view', () => {
        render(<Calendar activitiesMap={activitiesMap} dataLog={smallDataLog} displayType={CALENDAR_DISPLAY_TYPE.LIST}/>);
        expect(screen.queryByText('Monday')).not.toBeInTheDocument();
        expect(screen.queryByText('Wednesday')).not.toBeInTheDocument();
        expect(screen.queryByText('Friday')).not.toBeInTheDocument();
        expect(screen.queryByText('Sunday')).not.toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const {asFragment} = render(<Calendar activitiesMap={activitiesMap} dataLog={smallDataLog} displayType={CALENDAR_DISPLAY_TYPE.LIST}/>);
        expect(asFragment()).toMatchSnapshot();
    });

});

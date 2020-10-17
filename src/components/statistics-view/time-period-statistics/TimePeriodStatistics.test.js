import {render, screen} from "@testing-library/react";
import React from "react";
import TimePeriodStatistics from "./TimePeriodStatistics";

const activities = [
    {
        id: 123456,
        name: 'Read 5 pages',
        completed: false,
        style: ''
    },
    {
        id: 999,
        name: 'Workout 30 minutes',
        completed: false,
        style: ''
    }
];

const statistics = [
    {
        period: '2020',
        type: 'year',
        activities: {
            999: {
                count: 3
            },
            123456: {
                count: 1
            }
        }
    },
    {
        period: '2020-04',
        type: 'month',
        activities: {
            999: {
                count: 1
            },
            123456: {
                count: 0
            }
        }
    },
    {
        period: '2020-11',
        type: 'month',
        activities: {
            999: {
                count: 2
            },
            123456: {
                count: 1
            }
        }
    }
];

describe('TimePeriodStatistics', () => {

    it('should display statistics', () => {
        render(<TimePeriodStatistics activities={activities} statistics={statistics}/>);
        expect(screen.getAllByText('Read 5 pages')).toHaveLength(3);
        expect(screen.getAllByText('Workout 30 minutes')).toHaveLength(3);
    });

    it('should match snapshot', () => {
        const {asFragment} = render(<TimePeriodStatistics activities={activities} statistics={statistics}/>);
        expect(asFragment()).toMatchSnapshot();
    });
});

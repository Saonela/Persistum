import OverallStatistics from "./OverallStatistics";
import {render, screen} from "@testing-library/react";
import React from "react";

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

const statistics = {
    123456: {
        count: 2,
        firstTimestamp: '2010-11-02',
        lastTimestamp: '2020-11-05'
    },
    999: {
        count: 3,
        firstTimestamp: '2020-04-05',
        lastTimestamp: '2020-11-05'
    }
};

describe('OverallStatistics', () => {

    it('should display statistics', () => {
        render(<OverallStatistics activities={activities} statistics={statistics}/>);
        screen.getByText('Read 5 pages');
        screen.getByText('Workout 30 minutes');
    });

    it('should match snapshot', () => {
        const {asFragment} = render(<OverallStatistics activities={activities} statistics={statistics}/>);
        expect(asFragment()).toMatchSnapshot();
    });
});

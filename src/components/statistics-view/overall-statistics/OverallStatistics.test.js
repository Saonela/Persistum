import OverallStatistics from "./OverallStatistics";
import {render, screen} from "@testing-library/react";
import React from "react";

// const mockState = {
//     activities: {
//         data: [
//             {
//                 id: 123456,
//                 name: 'Read 5 pages',
//                 completed: false,
//                 style: ''
//             },
//             {
//                 id: 999,
//                 name: 'Workout 30 minutes',
//                 completed: false,
//                 style: ''
//             }
//         ]
//     },
//     logEntries: {
//         data: [
//             {
//                 timestamp: '2010-11-02',
//                 activities: [123456]
//             },
//             {
//                 timestamp: '2020-04-05',
//                 activities: [999]
//             },
//             {
//                 timestamp: '2020-11-01',
//                 activities: [999]
//             },
//             {
//                 timestamp: '2020-11-05',
//                 activities: [123456, 999]
//             },
//             {
//                 timestamp: '2020-12-03',
//                 activities: []
//             }
//         ]
//     }
// };

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

// jest.mock('react-redux', () => ({
//     useDispatch: jest.fn(() => {
//     }),
//     useSelector: jest.fn((callback) => {
//         return callback(mockState)
//     }),
// }));


describe('OverallStatistics', () => {

    it('should display statistics', () => {
        render(<OverallStatistics activities={activities} statistics={statistics}/>);
        screen.getByText('Read 5 pages');
        screen.getByText('Workout 30 minutes');
    });

    // SNAPSHOT
});

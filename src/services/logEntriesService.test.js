import LogEntriesService from './logEntriesService';
import moment from "moment";

jest.mock('moment', () => {
    let input;
    const mMoment = {
        day: () => {
            return jest.requireActual('moment')(input).day();
        },
        daysInMonth: () => {
            return 5;
        },
        format: (format) => {
            return jest.requireActual('moment')(input, format).format('YYYY-MM-DD');
        }
    };
    return jest.fn((params) => {
        input = params;
        return mMoment
    });
});

describe('LogEntriesService', () => {

    const dataEntries = [
        {
            timestamp: '2010-11-02',
            activities: [123456]
        },
        {
            timestamp: '2020-04-05',
            activities: [999]
        },
        {
            timestamp: '2020-11-01',
            activities: [999]
        },
        {
            timestamp: '2020-11-05',
            activities: [123456, 999]
        },
        {
            timestamp: '2020-12-03',
            activities: []
        }
    ];

    it('should populate entries with activities', () => {
        const activities = [
            {
                id: 123456,
                name: 'Learn redux',
                style: ''
            },
            {
                id: 999,
                name: 'Read',
                style: ''
            }
        ];
        expect(LogEntriesService.populateLogEntriesWithActivities(dataEntries, activities)).toEqual(
            [
                {
                    timestamp: '2010-11-02',
                    activities: [{
                        id: 123456,
                        name: 'Learn redux',
                        style: ''
                    }]
                },
                {
                    timestamp: '2020-04-05',
                    activities: [{
                        id: 999,
                        name: 'Read',
                        style: ''
                    }]
                },
                {
                    timestamp: '2020-11-01',
                    activities: [{
                        id: 999,
                        name: 'Read',
                        style: ''
                    }]
                },
                {
                    timestamp: '2020-11-05',
                    activities: [
                        {
                            id: 123456,
                            name: 'Learn redux',
                            style: ''
                        },
                        {
                            id: 999,
                            name: 'Read',
                            style: ''
                        }
                    ]
                },
                {
                    timestamp: '2020-12-03',
                    activities: []
                }
            ]);
    });

    it('should return calendar format of data log state', () => {
        expect(LogEntriesService.getCalendarLog(dataEntries)).toEqual([
            {
                year: '2020',
                data: [
                    {
                        month: '11',
                        data: [
                            {
                                timestamp: '2020-11-05',
                                activities: [123456, 999]
                            },
                            {
                                timestamp: '2020-11-04',
                                activities: []
                            },
                            {
                                timestamp: '2020-11-03',
                                activities: []
                            },
                            {
                                timestamp: '2020-11-02',
                                activities: []
                            },
                            {
                                timestamp: '2020-11-01',
                                activities: [999]
                            }
                        ]
                    },
                    {
                        month: '4',
                        data: [
                            {
                                timestamp: '2020-04-05',
                                activities: [999]
                            },
                            {
                                timestamp: '2020-04-04',
                                activities: []
                            },
                            {
                                timestamp: '2020-04-03',
                                activities: []
                            },
                            {
                                timestamp: '2020-04-02',
                                activities: []
                            },
                            {
                                timestamp: '2020-04-01',
                                activities: []
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
                                timestamp: '2010-11-05',
                                activities: []
                            },
                            {
                                timestamp: '2010-11-04',
                                activities: []
                            },
                            {
                                timestamp: '2010-11-03',
                                activities: []
                            },
                            {
                                timestamp: '2010-11-02',
                                activities: [123456]
                            },
                            {
                                timestamp: '2010-11-01',
                                activities: []
                            }
                        ]
                    }
                ]
            }
        ]);
    });
});

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

    const logEntries = [
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
        expect(LogEntriesService.populateLogEntriesWithActivities(logEntries, activities)).toEqual(
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
        expect(LogEntriesService.getCalendarLog(logEntries)).toEqual([
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

    it('should get log overall statistics', () => {
        expect(LogEntriesService.getActivitiesOverallStatistics(logEntries, activities)).toEqual({
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
        });
    });

    it('should get log time period statistics', () => {
        expect(LogEntriesService.getActivitiesTimePeriodStatistics(logEntries, activities)).toEqual([
            {
                period: '2010',
                type: 'year',
                activities: {
                    999: {
                        count: 0
                    },
                    123456: {
                        count: 1
                    }
                }
            },
            {
                period: '2010-11',
                type: 'month',
                activities: {
                    999: {
                        count: 0
                    },
                    123456: {
                        count: 1
                    }
                }
            },
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
            },
            {
                period: '2020-12',
                type: 'month',
                activities: {
                    999: {
                        count: 0
                    },
                    123456: {
                        count: 0
                    }
                }
            }
        ]);
    });
});

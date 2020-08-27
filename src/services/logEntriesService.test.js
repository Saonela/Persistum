import LogEntriesService from './logEntriesService';

describe('LogEntriesService', () => {

    const dataEntries = [
        {
            timestamp: '2010-11-02',
            activities: [123456]
        },
        {
            timestamp: '2020-04-15',
            activities: [999]
        },
        {
            timestamp: '2020-11-10',
            activities: [999]
        },
        {
            timestamp: '2020-12-31',
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
                    timestamp: '2020-04-15',
                    activities: [{
                        id: 999,
                        name: 'Read',
                        style: ''
                    }]
                },
                {
                    timestamp: '2020-11-10',
                    activities: [{
                        id: 999,
                        name: 'Read',
                        style: ''
                    }]
                },
                {
                    timestamp: '2020-12-31',
                    activities: []
                }
            ]);
    });

    it('should return calendar format of data log state', () => {
        expect(LogEntriesService.getCalendarLog(dataEntries)).toEqual([
            {
                year: '2010',
                data: [
                    {
                        month: '11',
                        data: [
                            {
                                timestamp: '2010-11-02',
                                activities: [123456]
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
                                activities: [999]
                            }
                        ]
                    },
                    {
                        month: '11',
                        data: [
                            {
                                timestamp: '2020-11-10',
                                activities: [999]
                            }
                        ]
                    }
                ]
            },
        ]);
    });
});

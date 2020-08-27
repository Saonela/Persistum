import React from "react";
import activitiesReducer, {addActivity, deleteActivity, getFilteredActivities, updateActivity} from "./activitiesSlice";

describe('ActivitiesReducer', () => {

    const state = [
        {
            id: 11,
            name: 'Read 5 pages',
            completed: false,
            style: ''
        }
    ];

    it('should add activity', () => {
        expect(activitiesReducer(state, addActivity({
            id: 12,
            name: 'Workout 30 minutes',
            completed: false,
            style: ''
        }))).toEqual([
            {
                id: 11,
                name: 'Read 5 pages',
                completed: false,
                style: ''
            },
            {
                id: 12,
                name: 'Workout 30 minutes',
                completed: false,
                style: ''
            }
        ]);
    });

    it('should update activity', () => {
        expect(activitiesReducer(state, updateActivity({
            id: 11,
            name: 'Read 7 pages',
            completed: true
        }))).toEqual([{
            id: 11,
            name: 'Read 7 pages',
            completed: true,
            style: ''
        }]);
    });

    it('should remove activity', () => {
        expect(activitiesReducer(state, deleteActivity(11))).toEqual([]);
    });

    it('should get filtered activities', () => {
        const state = {
            activities: [
                {
                    id: 11,
                    name: 'Read 5 pages',
                    completed: false,
                    style: ''
                },
                {
                    id: 12,
                    name: 'Read 5 pages',
                    completed: false,
                    style: ''
                }
            ],
            filters: [11]
        };
        expect(getFilteredActivities(state)).toEqual([
            {
                id: 12,
                name: 'Read 5 pages',
                completed: false,
                style: ''
            }
        ])
    });
});

import React from "react";
import activitiesReducer, {
    createActivity,
    deleteActivity,
    getAllActivities,
    getFilteredActivities, updateActivity,
} from "./activitiesSlice";

describe('ActivitiesReducer', () => {

    const state = {
        data: [
            {
                id: 11,
                name: 'Read 5 pages',
                completed: false,
                style: ''
            }
        ]
    };

    it('should add activity', () => {
        expect(activitiesReducer(state, createActivity.fulfilled({
            id: 12,
            name: 'Workout 30 minutes',
            completed: false,
            style: ''
        }))).toEqual({data: [
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
        ]});
    });

    it('should update activity', () => {
        expect(activitiesReducer(state, updateActivity.fulfilled({
            id: 11,
            name: 'Read 7 pages',
            completed: true
        }))).toEqual({data :[{
            id: 11,
            name: 'Read 7 pages',
            completed: true,
            style: ''
        }]});
    });

    it('should delete activity', () => {
        expect(activitiesReducer(state, deleteActivity.fulfilled(11))).toEqual({data: []});
    });

    it('should get filtered activities', () => {
        expect(getAllActivities({activities: state})).toEqual([{
            id: 11,
            name: 'Read 5 pages',
            completed: false,
            style: ''
        }])
    });

    it('should get filtered activities', () => {
        const state = {
            activities: {
                data: [
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
                ]
            },
            filters: [11]
        };
        expect(getFilteredActivities(state)).toEqual([
            {
                id: 12,
                name: 'Read 5 pages',
                completed: false,
                style: ''
            }
        ]);
    });
});

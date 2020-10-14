import React from "react";
import activitiesReducer, {
    createActivity,
    deleteActivity, fetchActivities,
    getAllActivities,
    getFilteredActivities, reorderActivities, updateActivity,
} from "./activitiesSlice";
import {logout} from "./userSlice";
import {ASYNC_STATE_STATUS} from "../asyncStateStatus";

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

    it('should sort activities after fetch', () => {
        const state = {
            data: []
        };
        const activities = [{id: 11, positionIndex: 0}, {id: 12, positionIndex: 2}, {id: 13, positionIndex: 3}, {id: 14, positionIndex: 1}];
        expect(activitiesReducer(state, fetchActivities.fulfilled(activities))).toEqual({
            data: [{id: 11, positionIndex: 0}, {id: 14, positionIndex: 1}, {id: 12, positionIndex: 2}, {id: 13, positionIndex: 3}],
            status: 'succeeded',
        });
    });

    it('should reorder activities', () => {
        const state = {
            data: [{id: 11}, {id: 12}, {id: 13}, {id: 14}]
        };
        expect(activitiesReducer(state, reorderActivities({sourceIndex: 1, destinationIndex: 3}))).toEqual({
            data: [{id: 11}, {id: 13}, {id: 14}, {id: 12}]
        });
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
                id: 11,
                name: 'Read 5 pages',
                completed: false,
                style: ''
            }
        ]);
    });

    it('should clear data on logout', () => {
        const state = {
            status: ASYNC_STATE_STATUS.SUCCEEDED,
            error: {code: 404},
            data: [{}]
        };
        expect(activitiesReducer(state, logout())).toEqual({
            status: ASYNC_STATE_STATUS.IDLE,
            error: null,
            data: []
        });
    });

});

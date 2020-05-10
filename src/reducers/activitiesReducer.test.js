import React from "react";
import {activitiesReducer} from "./activitiesReducer";
import {ADD_ACTIVITY, DELETE_ACTIVITY, UPDATE_ACTIVITY} from "../actions/actions";

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
        expect(activitiesReducer(state, {
            type: ADD_ACTIVITY,
            payload: {
                id: 12,
                name: 'Workout 30 minutes',
                completed: false,
                style: ''
            }
        })).toEqual([
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
        expect(activitiesReducer(state, {
            type: UPDATE_ACTIVITY,
            payload: {
                id: 11,
                name: 'Read 7 pages',
                completed: true
            }
        })).toEqual([{
            id: 11,
            name: 'Read 7 pages',
            completed: true,
            style: ''
        }]);
    });

    it('should remove activity', () => {
        expect(activitiesReducer(state, {
            type: DELETE_ACTIVITY,
            payload: 11
        })).toEqual([]);
    });

});

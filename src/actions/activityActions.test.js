import React from "react";
import {
    addActivityAPI,
    deleteActivityAPI,
    updateActivityAPI
} from "./activityActions";
import {wait} from "@testing-library/dom";
import {ADD_ACTIVITY, DELETE_ACTIVITY, UPDATE_ACTIVITY} from "./actions";

jest.mock("../services/api/activityAPIService", () => {
    return {
        create(name) {
            return Promise.resolve({
                id: 1,
                name
            })
        },
        update(activity) {
            Promise.resolve(activity);
        },
        delete(id) {
            Promise.resolve(id);
        }
    }
})

jest.mock('./dataLogActions', () => ({ updateCurrentDataLog: jest.fn() }));

describe('ActivitiesActions', () => {
    let dispatchSpy;
    let updateDataLogSpy;

    beforeEach(() => {
        dispatchSpy = jest.fn();
        updateDataLogSpy = jest.fn();
    })

    it('should dispatch add activity action', async () => {
        addActivityAPI('Read')(dispatchSpy);
        await wait(() => {
            expect(dispatchSpy).toHaveBeenCalledWith({
                  type: ADD_ACTIVITY,
                  payload: {
                      id: 1,
                      name: 'Read'
                }
            });
        });
    });

    it('should dispatch update activity action', () => {
        updateActivityAPI({id: 1, name: 'abc'})(dispatchSpy);
        expect(dispatchSpy).toHaveBeenCalledWith({
            type: UPDATE_ACTIVITY,
            payload: {
                id: 1,
                name: 'abc'
            }
        });
    });

    it('should dispatch delete activity action', () => {
        deleteActivityAPI({id: 1, name: 'abc'})(dispatchSpy);
        expect(dispatchSpy).toHaveBeenCalledWith({
            type: DELETE_ACTIVITY,
            payload: 1
        });
    });
});

import {toggleCurrentLogActivities} from "./dataLogActions";
import {UPDATE_DATA_LOG} from "./actions";

jest.mock('../services/utilityService', () => ({
    getCurrentShortTimestamp: () => {
        return '2020-01-01';
    }
}));

describe('DataLogActions', () => {

    let dispatchSpy;

    beforeEach(() => {
        dispatchSpy = jest.fn();
    });

    it('should dispatch toggle data log activity action', () => {
        const getState = () => {
            return {
                dataLog: {
                    '2020-01-01': {
                        activities: [1, 2]
                    }
                }
            }
        };
        toggleCurrentLogActivities([1, 3])(dispatchSpy, getState);
        expect(dispatchSpy).toHaveBeenCalledWith({
            type: UPDATE_DATA_LOG,
            payload: {
                timestamp: '2020-01-01',
                activityIds: [2, 3]
            }
        });
        toggleCurrentLogActivities([])(dispatchSpy, getState);
        expect(dispatchSpy).toHaveBeenCalledWith({
            type: UPDATE_DATA_LOG,
            payload: {
                timestamp: '2020-01-01',
                activityIds: [1, 2]
            }
        });
    });
});

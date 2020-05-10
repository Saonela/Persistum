import {UPDATE_DATA_LOG} from "../actions/actions";
import {dataLogReducer} from "./dataLogReducer";

describe('DataLogReducer', () => {

    const state = {
        '2010-11-02': {
            activities: [1, 2]
        },
        '2019-09-15': {
            activities: [11]
        }
    };

    it('should append log', () => {
        expect(dataLogReducer(state, {
            type: UPDATE_DATA_LOG,
            payload: {
                timestamp: '2019-09-19',
                activityIds: [11, 12]
            }
        })).toEqual({
            '2010-11-02': {
                activities: [1, 2]
            },
            '2019-09-15': {
                activities: [11]
            },
            '2019-09-19': {
                activities: [11, 12]
            }
        });
    });

    it('should update log ', () => {
        expect(dataLogReducer(state, {
            type: UPDATE_DATA_LOG,
            payload: {
                timestamp: '2019-09-15',
                activityIds: [1]
            }
        })).toEqual({
            '2010-11-02': {
                activities: [1, 2]
            },
            '2019-09-15': {
                activities: [1]
            }
        });
    });
});

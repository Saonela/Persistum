import settingsReducer, {updateSettings} from "./settingsSlice";
import {CALENDAR_DISPLAY_TYPE} from "../../types/settings";


describe('SettingsReducer', () => {

    const state = {
        data: {
            calendarDisplayType: CALENDAR_DISPLAY_TYPE.GRID
        }
    };

    it('should update settings', () => {
        expect(settingsReducer(state, updateSettings.fulfilled({
            calendarDisplayType: CALENDAR_DISPLAY_TYPE.LIST
        }))).toEqual({
            data: {
                calendarDisplayType: CALENDAR_DISPLAY_TYPE.LIST
            }
        });
    });

});

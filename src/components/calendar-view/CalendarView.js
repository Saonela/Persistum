import React from "react";
import './CalendarView.css'
import {useDispatch, useSelector} from "react-redux";
import Calendar from "./calendar/Calendar";
import Legend from "../legend/Legend";
import {getCalendarDataLog} from "../../redux/slices/logEntriesSlice";
import {toggleFilter} from "../../redux/slices/filtersSlice";
import {getAllActivities} from "../../redux/slices/activitiesSlice";
import BackgroundLoader from "../background-loader/BackgroundLoader";
import {ASYNC_STATE_STATUS} from "../../redux/asyncStateStatus";
import CalendarDisplayToggleButton from "./calendar-display-toggle-button/CalendarDisplayToggleButton";
import {getSettings, updateSettings} from "../../redux/slices/settingsSlice";
import NoLogDataMessage from "../shared/no-log-data-message/NoLogDataMessage";

function CalendarView() {

    const dispatch = useDispatch();

    const calendarData = useSelector(getCalendarDataLog);
    const activities = useSelector(getAllActivities);
    const settings = useSelector(getSettings);
    const filters = useSelector(state => state.filters);
    const activitiesLoadingStatus = useSelector(state => state.activities.status);
    const logentriesLoadingStatus = useSelector(state => state.logEntries.status);

    const loading = activitiesLoadingStatus === ASYNC_STATE_STATUS.LOADING || logentriesLoadingStatus === ASYNC_STATE_STATUS.LOADING;

    console.log('CALENDAR VIEW data', calendarData);
    console.log('CALENDAR VIEW filters', filters);

    const activitiesMap = {};
    activities.forEach(activity => activitiesMap[activity.id] = activity);
    console.log('CALENDAR VIEW activitiesMap', activitiesMap);

    const isDataValid = () => {
        const isDataInvalid = !loading &&
            !calendarData.length &&
            activitiesLoadingStatus !== ASYNC_STATE_STATUS.IDLE &&
            logentriesLoadingStatus !== ASYNC_STATE_STATUS.IDLE;
        return !isDataInvalid;
    }

    return (
        <div className="calendar-view">
            {loading && <BackgroundLoader/>}
            {isDataValid() ?
                <>
                    <div className="calendar-view__legend">
                        <Legend activities={activities}
                                filters={filters}
                                onFilter={(id) => dispatch(toggleFilter(id))}/>
                    </div>
                    <div className="scroll-container">
                        <div className="calendar-view__table">
                            {isDataValid() &&
                            <div className="calendar-view__display-toggle-button">
                                <CalendarDisplayToggleButton
                                    calendarDisplayType={settings.calendarDisplayType}
                                    onToggle={(type) => dispatch(updateSettings({calendarDisplayType: type}))}/>
                            </div>
                            }
                            <Calendar activitiesMap={activitiesMap} dataLog={calendarData}
                                      displayType={settings.calendarDisplayType}/>
                        </div>
                    </div>
                </> :
                <NoLogDataMessage/>
            }
        </div>
    )
}

export default CalendarView;

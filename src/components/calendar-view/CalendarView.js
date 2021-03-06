import React, {useRef} from "react";
import './CalendarView.css'
import {useDispatch, useSelector} from "react-redux";
import Calendar from "./calendar/Calendar";
import Legend from "../legend/Legend";
import {getCalendarDataLog} from "../../redux/slices/logEntriesSlice";
import {getFilters, toggleFilter} from "../../redux/slices/filtersSlice";
import {getAllActivities} from "../../redux/slices/activitiesSlice";
import {ASYNC_STATE_STATUS} from "../../redux/asyncStateStatus";
import CalendarDisplayToggleButton from "./calendar-display-toggle-button/CalendarDisplayToggleButton";
import {getSettings, updateSettings} from "../../redux/slices/settingsSlice";
import NoLogDataMessage from "../shared/no-log-data-message/NoLogDataMessage";
import withLoader from "../with-loader/WithLoader";
import ScrollToTopButton from "../shared/scroll-to-top-button/ScrollToTopButton";

function CalendarView({onLoadingStateChange}) {

    const scrollableContainer = useRef();

    const dispatch = useDispatch();

    const settings = useSelector(getSettings);
    const activities = useSelector(getAllActivities);
    const calendarData = useSelector(getCalendarDataLog);
    const filters = useSelector(getFilters);

    const activitiesLoadingStatus = useSelector(state => state.activities.status);
    const logentriesLoadingStatus = useSelector(state => state.logEntries.status);
    const loading = activitiesLoadingStatus === ASYNC_STATE_STATUS.LOADING
                 || logentriesLoadingStatus === ASYNC_STATE_STATUS.LOADING;

    onLoadingStateChange(loading);

    const activitiesMap = {};
    activities.forEach(activity => activitiesMap[activity.id] = activity);

    return (
        <div className="calendar-view">
            {!!calendarData.length &&
            <>
                <Legend activities={activities} filters={filters} onFilter={(id) => dispatch(toggleFilter(id))}/>
                <div className="scroll-container" ref={scrollableContainer}>
                    <div className="calendar-view__table">
                        <div className="calendar-view__display-toggle-button">
                            <CalendarDisplayToggleButton
                                calendarDisplayType={settings.calendarDisplayType}
                                onToggle={(type) => dispatch(updateSettings({calendarDisplayType: type}))}/>
                        </div>
                        <Calendar activitiesMap={activitiesMap}
                                  dataLog={calendarData}
                                  displayType={settings.calendarDisplayType}/>
                    </div>
                    <ScrollToTopButton containerRef={scrollableContainer}/>
                </div>
            </>
            }
            {!calendarData.length &&
            activitiesLoadingStatus === ASYNC_STATE_STATUS.SUCCEEDED &&
            logentriesLoadingStatus === ASYNC_STATE_STATUS.SUCCEEDED &&
            <NoLogDataMessage/>}
        </div>
    )
}

export default withLoader(CalendarView);

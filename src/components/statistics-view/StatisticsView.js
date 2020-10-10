import "./StatisticsView.css"
import React from "react";
import BackgroundLoader from "../background-loader/BackgroundLoader";
import {useSelector} from "react-redux";
import {
    getLogEntries,
    getOverallStatistics,
    getTimePeriodStatistics
} from "../../redux/slices/logEntriesSlice";
import {getAllActivities} from "../../redux/slices/activitiesSlice";
import {getSettings} from "../../redux/slices/settingsSlice";
import {ASYNC_STATE_STATUS} from "../../redux/asyncStateStatus";
import OverallStatistics from "./overall-statistics/OverallStatistics";
import TimePeriodStatistics from "./time-period-statistics/TimePeriodStatistics";
import NoLogDataMessage from "../shared/no-log-data-message/NoLogDataMessage";
import withLoader from "../with-loader/WithLoader";

function StatisticsView({onLoadingStateChange}) {


    const logEntries = useSelector(getLogEntries);
    // const calendarData = useSelector(getCalendarDataLog);
    const activities = useSelector(getAllActivities);
    const settings = useSelector(getSettings);
    const overallStatistics = useSelector(getOverallStatistics);
    const timePeriodStatistics = useSelector(getTimePeriodStatistics);

    const filters = useSelector(state => state.filters);

    // console.log('STATS.calendarData', calendarData)
    // console.log('STATS.logEntries', logEntries)
    // console.log('STATS.activities', activities)
    // console.log('STATS.settings', settings)
    // console.log('STATS.filters', filters)

    console.log('overallStatistics', overallStatistics);
    console.log('timePeriodStatistics', timePeriodStatistics);

    const activitiesLoadingStatus = useSelector(state => state.activities.status);
    const logentriesLoadingStatus = useSelector(state => state.logEntries.status);

    const loading = activitiesLoadingStatus === ASYNC_STATE_STATUS.LOADING ||
                    logentriesLoadingStatus === ASYNC_STATE_STATUS.LOADING;

    onLoadingStateChange(loading);

    return (
        <div className="statistics-view">
            {!!activities.length &&
            <div className="statistics-view__content">
                <OverallStatistics activities={activities} statistics={overallStatistics}/>
                <TimePeriodStatistics activities={activities} statistics={timePeriodStatistics}/>
            </div>
            }
            {!activities.length &&
            activitiesLoadingStatus === ASYNC_STATE_STATUS.SUCCEEDED &&
            logentriesLoadingStatus === ASYNC_STATE_STATUS.SUCCEEDED &&
            <NoLogDataMessage/>}
        </div>
    )
}

export default withLoader(StatisticsView);

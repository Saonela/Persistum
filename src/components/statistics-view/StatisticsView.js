import "./StatisticsView.css"
import React from "react";
import BackgroundLoader from "../background-loader/BackgroundLoader";
import {useSelector} from "react-redux";
import {getCalendarDataLog, getLogEntries, getOverallStatistics} from "../../redux/slices/logEntriesSlice";
import {getAllActivities} from "../../redux/slices/activitiesSlice";
import {getSettings} from "../../redux/slices/settingsSlice";
import {ASYNC_STATE_STATUS} from "../../redux/asyncStateStatus";
import OverallStatistics from "./OverallStatistics/OverallStatistics";

function StatisticsView() {


    const logEntries = useSelector(getLogEntries);
    const calendarData = useSelector(getCalendarDataLog);
    const activities = useSelector(getAllActivities);
    const settings = useSelector(getSettings);
    const statistics = useSelector(getOverallStatistics);

    const filters = useSelector(state => state.filters);

    // console.log('STATS.calendarData', calendarData)
    // console.log('STATS.logEntries', logEntries)
    // console.log('STATS.activities', activities)
    // console.log('STATS.settings', settings)
    // console.log('STATS.filters', filters)

    const activitiesLoadingStatus = useSelector(state => state.activities.status);
    const logentriesLoadingStatus = useSelector(state => state.logEntries.status);

    const loading = activitiesLoadingStatus === ASYNC_STATE_STATUS.LOADING || logentriesLoadingStatus === ASYNC_STATE_STATUS.LOADING;

    return (
        <div className="statistics-view">
            {loading && <BackgroundLoader/>}
            <div className="statistics-view__content">
                <OverallStatistics activities={activities} statistics={statistics}/>
            </div>
        </div>
    )
}

export default StatisticsView;

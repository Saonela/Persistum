import "./StatisticsView.css"
import React, {useRef} from "react";
import {useSelector} from "react-redux";
import {
    getOverallStatistics,
    getTimePeriodStatistics
} from "../../redux/slices/logEntriesSlice";
import {getAllActivities} from "../../redux/slices/activitiesSlice";
import {ASYNC_STATE_STATUS} from "../../redux/asyncStateStatus";
import OverallStatistics from "./overall-statistics/OverallStatistics";
import TimePeriodStatistics from "./time-period-statistics/TimePeriodStatistics";
import NoLogDataMessage from "../shared/no-log-data-message/NoLogDataMessage";
import withLoader from "../with-loader/WithLoader";
import ScrollToTopButton from "../shared/scroll-to-top-button/ScrollToTopButton";

function StatisticsView({onLoadingStateChange}) {

    const scrollableContainer = useRef();

    const activities = useSelector(getAllActivities);
    const overallStatistics = useSelector(getOverallStatistics);
    const timePeriodStatistics = useSelector(getTimePeriodStatistics);

    const activitiesLoadingStatus = useSelector(state => state.activities.status);
    const logentriesLoadingStatus = useSelector(state => state.logEntries.status);
    const loading = activitiesLoadingStatus === ASYNC_STATE_STATUS.LOADING ||
                    logentriesLoadingStatus === ASYNC_STATE_STATUS.LOADING;

    onLoadingStateChange(loading);

    return (
        <div className="statistics-view" ref={scrollableContainer}>
            {timePeriodStatistics && timePeriodStatistics &&
            <div className="statistics-view__content">
                <OverallStatistics activities={activities} statistics={overallStatistics}/>
                <TimePeriodStatistics activities={activities} statistics={timePeriodStatistics}/>
            </div>
            }
            {(!timePeriodStatistics || !timePeriodStatistics) &&
            activitiesLoadingStatus === ASYNC_STATE_STATUS.SUCCEEDED &&
            logentriesLoadingStatus === ASYNC_STATE_STATUS.SUCCEEDED &&
            <NoLogDataMessage/>}
            <ScrollToTopButton containerRef={scrollableContainer}/>
        </div>
    )
}

export default withLoader(StatisticsView);

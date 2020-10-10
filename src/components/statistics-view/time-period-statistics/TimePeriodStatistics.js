import React from "react";
import "./TimePeriodStatistics.css"
import moment from "moment";
import ActivityEntry from "../../shared/activity-entry/ActivityEntry";

function TimePeriodStatisticsPeriod({item}) {
    if (item.type === 'year') {
        return (
            <span>{moment(item.period, 'YYYY-MM').format("YYYY")}</span>
        )
    } else {
        return (
            <>
                <span>{moment(item.period, 'YYYY-MM').format("MMMM")}</span>
                <span className="time-period-statistics__period-secondary" style={{fontSize: '13px'}}>
                    {moment(item.period, 'YYYY-MM').format("YYYY")}
                </span>
            </>
        )
    }
}

function TimePeriodStatistics({activities, statistics}) {
    return (
        <div className="app-panel app-border time-period-statistics statistics-panel">
            <div className="statistics-panel__header">Time Period</div>
            {statistics.map(item =>
                <div key={item.period} className="time-period-statistics__item">
                    <div className="time-period-statistics__period">
                        <TimePeriodStatisticsPeriod item={item}/>
                    </div>
                    <div className="time-period-statistics__list-header">
                        <p className="time-period-statistics__header-item">Activity</p>
                        <p className="time-period-statistics__header-item">Count</p>
                    </div>
                    {activities.map(activity =>
                        <div className="time-period-statistics-entry" key={activity.id}>
                            <ActivityEntry activity={activity}/>
                            <p data-label="Count:" className="time-period-statistics-entry__count">{item.activities[activity.id].count}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default TimePeriodStatistics;

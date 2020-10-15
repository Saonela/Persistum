import React from "react";
import "./OverallStatistics.css"
import ActivityEntry from "../../shared/activity-entry/ActivityEntry";

function OverallStatistics({activities, statistics}) {
    return (
        <div className="app-panel app-border overall-statistics statistics-panel">
            <div className="statistics-panel__header">Overall</div>
            <div className="overall-statistics__list-header">
                <p className="overall-statistics__header-item">Activity</p>
                <p className="overall-statistics__header-item">Count</p>
                <p className="overall-statistics__header-item">First Occurrence</p>
                <p className="overall-statistics__header-item">Last Occurrence</p>
            </div>
            <div className="overall-statistics__list">
                {activities.map(activity =>
                    <div className="overall-statistics-entry" key={activity.id}>
                        <ActivityEntry activity={activity}/>
                        <p data-label="Count:" className="overall-statistics-entry__count">{statistics[activity.id].count}</p>
                        <p data-label="First Occurrence:" className="overall-statistics-entry__first-timestamp">{statistics[activity.id].firstTimestamp}</p>
                        <p data-label="Last Occurrence:" className="overall-statistics-entry__last-timestamp">{statistics[activity.id].lastTimestamp}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OverallStatistics;

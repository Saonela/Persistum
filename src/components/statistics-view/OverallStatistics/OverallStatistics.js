import React from "react";
import "./OverallStatistics.css"
import ActivityColor from "../../shared/ActivityColor/ActivityColor";

function StatisticsView({activities, statistics}) {

    console.log('overall stats', statistics);

    return (
        <div className="app-panel app-border overall-statistics">
            <div className="overall-statistics__header">Overall</div>
            <div className="overall-statistics__list-header">
                <p className="overall-statistics__header-item">Activity</p>
                <p className="overall-statistics__header-item">Count</p>
                <p className="overall-statistics__header-item">First Occurrence</p>
                <p className="overall-statistics__header-item">Last Occurrence</p>
            </div>
            <div className="overall-statistics__list">
                {activities.map(activity =>
                    <div className="statistics-entry" key={activity.id}>
                        <p data-label="Activity" className="statistics-entry__activity">
                            <ActivityColor background={activity.style.background}/>
                            {activity.name}
                        </p>
                        <p data-label="Count" className="statistics-entry__count">{statistics[activity.id].count}</p>
                        <p data-label="First Occurrence" className="statistics-entry__first-timestamp">{statistics[activity.id].firstTimestamp}</p>
                        <p data-label="Last Occurrence" className="statistics-entry__last-timestamp">{statistics[activity.id].lastTimestamp}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StatisticsView;

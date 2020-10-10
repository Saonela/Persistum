import ActivityColor from "../activity-color/ActivityColor";
import React from "react";
import "./ActivityEntry.css"

const ActivityEntry = ({activity}) => (
    <div data-label="Activity" className="activity-entry">
        <ActivityColor background={activity.style.background}/>
        {activity.name}
    </div>
);

export default ActivityEntry;

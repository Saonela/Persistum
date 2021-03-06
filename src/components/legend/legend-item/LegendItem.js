import React from "react";
import "./LegendItem.css"
import ActivityColor from "../../shared/activity-color/ActivityColor";

function LegendItem({activity, isActive, onToggle}) {
    return (
        <button className={`legend-item ${isActive ? 'legend-item--active' : ''}`} onClick={() => onToggle(!isActive)} aria-label="Filter">
            <div className="legend-item__name">{activity.name}</div>
            <ActivityColor background={activity.style.background}/>
        </button>
    )
}

export default LegendItem;

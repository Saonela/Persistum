import React from "react";
import './Legend.css'
import LegendItem from "./legend-item/LegendItem";

function Legend({activities, filters, onFilter}) {

    return (
        <div className="legend">
            {activities.map((activity) =>
                <div role="listitem" className="legend__item" key={activity.id}>
                    <LegendItem activity={activity} isActive={!filters.includes(activity.id)} onToggle={() => onFilter(activity.id)}/>
                </div>
            )}
        </div>
    );
}

export default Legend;

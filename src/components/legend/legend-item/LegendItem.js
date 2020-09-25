import React from "react";
import "./LegendItem.css"

function LegendItem({activity, isActive, onToggle}) {
    return (
        <button className={`legend-item ${!isActive ? 'legend-item--inactive' : ''}`} onClick={() => onToggle(!isActive)}>
            <div className="legend-item__name">{activity.name}</div>
            <div className="legend-item__color" role="img" style={{'backgroundColor': activity.style.background}}/>
        </button>
    )
}

export default LegendItem;

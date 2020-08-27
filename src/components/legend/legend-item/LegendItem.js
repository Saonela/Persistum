import Checkbox from "@material-ui/core/Checkbox";
import React from "react";
import "./LegendItem.css"

function LegendItem({activity, isActive, onToggle}) {
    return (
        <div className="legend-item" onClick={() => onToggle(!isActive)}>
            <Checkbox checked={isActive} color="default"/>
            <div className="legend-item__name">{activity.name}</div>
            <div className="legend-item__color" role="img" style={{'backgroundColor': activity.style.background}}/>
        </div>
    )
}

export default LegendItem;

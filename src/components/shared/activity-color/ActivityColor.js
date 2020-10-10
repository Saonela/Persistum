import React from "react";
import "./ActivityColor.css"

const ActivityColor = ({background}) => (
    <div className="activity-color" aria-label="Activity color" role="img" style={{'backgroundColor': background}}/>
);

export default ActivityColor;

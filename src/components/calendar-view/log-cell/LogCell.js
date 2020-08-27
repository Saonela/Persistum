import React from "react";
import './LogCell.css'
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";

function LogCell({timestamp, activities}) {

    return (
        <div className="log-cell">
            <div className="log-cell__timestamp">{moment(timestamp).format("DD")}</div>
            <div className="log-cell__activities">
                {activities.map((activity) =>
                    <Tooltip key={activity.id} disableFocusListener title={activity.name} placement="top" arrow>
                        <div className="log-cell__activity" style={{background: activity.style.background}} role="listitem" aria-label="Activity"/>
                    </Tooltip>
                )}
            </div>
        </div>
    );
}

export default LogCell;

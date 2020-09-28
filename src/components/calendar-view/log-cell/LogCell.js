import React from "react";
import './LogCell.css'
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";

function LogCell({timestamp, activities}) {

    const isWeekend = () => {
        const day = moment(timestamp).day();
        return day === 0 || day === 6;
    }

    return (
        <div className="log-cell">
            <div className="log-cell__timestamp">
                <span>{moment(timestamp).format("DD")}</span>
                <span className={`log-cell__weekday ${isWeekend() && 'log-cell__weekend'}`} style={{float: 'right'}}>
                    {moment(timestamp).format("dd")}
                </span>
            </div>
            <div className="log-cell__activities">
                {activities.map((activity) =>
                    <Tooltip key={activity.id}
                             disableFocusListener
                             enterTouchDelay={0}
                             leaveTouchDelay={1500}
                             title={activity.name}
                             placement="top"
                             arrow>
                        <div className="log-cell__activity" style={{background: activity.style.background}} role="listitem" aria-label="Activity"/>
                    </Tooltip>
                )}
            </div>
        </div>
    );
}

export default LogCell;

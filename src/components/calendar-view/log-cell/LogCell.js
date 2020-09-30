import React from "react";
import './LogCell.css'
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";
import {CALENDAR_DISPLAY_TYPE} from "../../../types/settings";

const LogActivityColor = React.forwardRef(({background}, ref) => (
    <div className="log-cell__activity-color"
         style={{background}}
         role="listitem"
         aria-label="Activity"/>
));

function LogCell({timestamp, activities, displayType}) {

    const isWeekend = () => {
        const day = moment(timestamp).day();
        return day === 0 || day === 6;
    }

    return (
        <div className={`log-cell ${displayType === CALENDAR_DISPLAY_TYPE.LIST && 'list-view'}`}>
            <div className="log-cell__timestamp">
                <span>{moment(timestamp).format("DD")}</span>
                <span className={`log-cell__weekday ${isWeekend() && 'log-cell__weekend'}`}>
                    {moment(timestamp).format("dd")}
                </span>
            </div>
            <div className="log-cell__activities">
                {activities.map((activity) =>
                    <div className="log-cell__activity" key={activity.id}>
                        {displayType === CALENDAR_DISPLAY_TYPE.GRID &&
                            <Tooltip disableFocusListener
                                     enterTouchDelay={0}
                                     leaveTouchDelay={1500}
                                     title={activity.name}
                                     placement="top"
                                     arrow>
                                <LogActivityColor background={activity.style.background}/>
                            </Tooltip>
                        }
                        {displayType === CALENDAR_DISPLAY_TYPE.LIST &&
                            <>
                                <LogActivityColor background={activity.style.background}/>
                                <p className="log-cell__activity-name">{activity.name}</p>
                            </>
                        }
                    </div>
                )}
            </div>
        </div>
    );
}

export default LogCell;

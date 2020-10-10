import React from "react";
import './CalendarCell.css'
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";
import {CALENDAR_DISPLAY_TYPE} from "../../../types/settings";
import UtilityService from "../../../services/utilityService";
import ActivityColor from "../../shared/activity-color/ActivityColor";

const LogActivity = ({activity, displayType}) => (
    <Tooltip disableFocusListener
             disableHoverListener={displayType !== CALENDAR_DISPLAY_TYPE.GRID}
             disableTouchListener={displayType !== CALENDAR_DISPLAY_TYPE.GRID}
             enterTouchDelay={0}
             leaveTouchDelay={1500}
             title={activity.name}
             placement="top"
             arrow>
        <div className="log-activity">
            <ActivityColor background={activity.style.background}/>
            {displayType === CALENDAR_DISPLAY_TYPE.LIST && <p className="log-activity__name">{activity.name}</p>}
        </div>
    </Tooltip>
);

function CalendarCell({timestamp, activities, displayType}) {

    const isWeekend = () => {
        const day = moment(timestamp).day();
        return day === 0 || day === 6;
    }

    return (
        <div className={`calendar-cell 
                         ${timestamp === UtilityService.getCurrentShortTimestamp() ? 'calendar-cell--highlight' : ''}
                         ${displayType === CALENDAR_DISPLAY_TYPE.LIST ? 'list-view' : ''}`}>
            <div className="calendar-cell__timestamp">
                <span>{moment(timestamp).format("DD")}</span>
                <span className={`calendar-cell__weekday ${isWeekend() ? 'calendar-cell__weekend' : ''}`}>
                    {moment(timestamp).format("dd")}
                </span>
            </div>
            <div className="calendar-cell__activities">
                {activities.map((activity) =>
                    <LogActivity key={activity.id} activity={activity} displayType={displayType}/>
                )}
            </div>
        </div>
    );
}

export default CalendarCell;

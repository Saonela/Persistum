import React from "react";
import './CalendarCell.css'
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";
import {CALENDAR_DISPLAY_TYPE} from "../../../types/settings";

const LogActivityColor = React.forwardRef(({name, background, tooltip}, ref) => {
    const getColorElement = () => (
        <div className="log-activity__color"
             style={{background}}
             role="listitem"
             aria-label="Activity"/>
    );

    return (
        tooltip ?
            <Tooltip disableFocusListener
                     enterTouchDelay={0}
                     leaveTouchDelay={1500}
                     title={name}
                     placement="top"
                     arrow>
                {getColorElement()}
            </Tooltip>
            : <>{getColorElement()}</>
    )
});

const LogActivity = React.forwardRef(({activity, displayType}, ref) => (
    <div className="log-activity">
        <LogActivityColor background={activity.style.background} name={activity.name} tooltip={displayType === CALENDAR_DISPLAY_TYPE.GRID}/>
        {displayType === CALENDAR_DISPLAY_TYPE.LIST && <p className="log-activity__name">{activity.name}</p>}
    </div>
));

function CalendarCell({timestamp, activities, displayType}) {

    const isWeekend = () => {
        const day = moment(timestamp).day();
        return day === 0 || day === 6;
    }

    return (
        <div className={`calendar-cell ${displayType === CALENDAR_DISPLAY_TYPE.LIST && 'list-view'}`}>
            <div className="calendar-cell__timestamp">
                <span>{moment(timestamp).format("DD")}</span>
                <span className={`calendar-cell__weekday ${isWeekend() && 'calendar-cell__weekend'}`}>
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

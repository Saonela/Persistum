import React from "react";
import './Calendar.css'
import moment from "moment";
import WeekdaysHeader from "../weekdays-header/WeekdaysHeader";
import {CALENDAR_DISPLAY_TYPE} from "../../../types/settings";
import CalendarCell from "../calendar-cell/CalendarCell";

function Calendar({activitiesMap, dataLog, displayType}) {

    const renderDayPlaceholder = (timestamp) => {
        const placeholders = [];
        const weekday = moment(timestamp, 'YYYY-MM-DD').day();
        const limit = 7 - (weekday === 0 ? 7 : weekday); // moment.js sunday = 0
        for (let i = 0; i < limit; i++) {
            placeholders.push(<div key={i} className="calendar__days-placeholder" data-testid="day-placeholder"/>);
        }
        return placeholders;
    };

    const mapIdToActivity = (activityIds) => {
        return activityIds.map(id => activitiesMap[id]).filter(activity => activity);
    };

    return (
        <React.Fragment>
            <div className={`calendar ${displayType === CALENDAR_DISPLAY_TYPE.LIST && 'list-view'}`}>
                {dataLog.map((yearData, i) =>
                    <div className="calendar__year" key={yearData.year} data-testid={'year-' + yearData.year}>
                        <div className="calendar__year-label">{yearData.year}</div>
                        {yearData.data.map((monthData, i) =>
                            <div className="calendar__month" key={monthData.month} data-testid={'month-' + monthData.month}>
                                <div className="calendar__month-label">{moment().month(monthData.month - 1).format("MMMM")}</div>
                                {displayType !== CALENDAR_DISPLAY_TYPE.LIST && <WeekdaysHeader/>}
                                <div className="calendar__days">
                                    {renderDayPlaceholder(monthData.data[0].timestamp)}
                                    {monthData.data.map((entryData) =>
                                        <CalendarCell className="calendar__cell"
                                                      displayType={displayType}
                                                      key={entryData.timestamp}
                                                      timestamp={entryData.timestamp}
                                                      activities={mapIdToActivity(entryData.activities)}/>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}

export default Calendar;

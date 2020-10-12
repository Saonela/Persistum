import React from "react";
import './Calendar.css'
import moment from "moment";
import WeekdaysHeader from "../weekdays-header/WeekdaysHeader";
import {CALENDAR_DISPLAY_TYPE} from "../../../types/settings";
import CalendarCell from "../calendar-cell/CalendarCell";

const CalendarYearLabel = ({year}) => (
    <div className="calendar-year-label">{year}</div>
);

const CalendarMonthLabel = ({year, month}) => (
    <div className="calendar-month-label">
        <span className="calendar-month-label__month">{moment().month(month - 1).format("MMMM")}</span>
        {!!year && <span className="calendar-month-label__year">{year}</span>}
    </div>
);

function Calendar({activitiesMap, dataLog, displayType}) {

    const renderDayPlaceholders = (timestamp) => {
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
        <div className={`calendar ${displayType === CALENDAR_DISPLAY_TYPE.LIST ? 'list-view' : null}`}>
            {dataLog.map((yearData, i) =>
                <div className="calendar__year" key={yearData.year} data-testid={'year-' + yearData.year}>
                    <CalendarYearLabel year={yearData.year}/>
                    {yearData.data.map((monthData, i) =>
                        <div className="calendar__month" key={monthData.month} data-testid={'month-' + monthData.month}>
                            <CalendarMonthLabel year={(i !== 0 ? yearData.year : null)} month={monthData.month}/>
                            {displayType !== CALENDAR_DISPLAY_TYPE.LIST && <WeekdaysHeader/>}
                            <div className="calendar__days">
                                {renderDayPlaceholders(monthData.data[0].timestamp)}
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
    )
}

export default Calendar;

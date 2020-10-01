import React from "react";
import './Calendar.css'
import moment from "moment";
import WeekdaysHeader from "../weekdays-header/WeekdaysHeader";
import {CALENDAR_DISPLAY_TYPE} from "../../../types/settings";
import CalendarCell from "../calendar-cell/CalendarCell";

function Calendar({dataLog, displayType}) {

    const renderDayPlaceholder = (timestamp) => {
        const placeholders = [];
        const weekday = moment(timestamp, 'YYYY-MM-DD').day();
        const limit = 7 - (weekday === 0 ? 7 : weekday); // moment.js sunday = 0
        for (let i = 0; i < limit; i++) {
            placeholders.push(<div key={i} className="calendar__days-placeholder" data-testid="day-placeholder"/>);
        }
        return placeholders;
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
                                                      key={entryData.timestamp}
                                                      displayType={displayType}
                                                      timestamp={entryData.timestamp}
                                                      activities={entryData.activities}
                                        />
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

import React from "react";
import './LogTable.css'
import LogCell from "../log-cell/LogCell";
import moment from "moment";
import WeekdaysHeader from "../weekdays-header/WeekdaysHeader";
import {CALENDAR_DISPLAY_TYPE} from "../../../types/settings";

function LogTable({dataLog, displayType}) {

    const renderDayPlaceholder = (timestamp) => {
        const placeholders = [];
        const weekday = moment(timestamp, 'YYYY-MM-DD').day();
        const limit = 7 - (weekday === 0 ? 7 : weekday); // moment.js sunday = 0
        for (let i = 0; i < limit; i++) {
            placeholders.push(<div key={i} className="log-table__days-placeholder" data-testid="day-placeholder"/>);
        }
        return placeholders;
    };

    return (
        <React.Fragment>
            <div className={`log-table ${displayType === CALENDAR_DISPLAY_TYPE.LIST && 'list-view'}`}>
                {dataLog.map((yearData, i) =>
                    <div className="log-table__year" key={yearData.year} data-testid={'year-' + yearData.year}>
                        <div className="log-table__year-label">{yearData.year}</div>
                        {yearData.data.map((monthData, i) =>
                            <div className="log-table__month" key={monthData.month} data-testid={'month-' + monthData.month}>
                                <div className="log-table__month-label">{moment().month(monthData.month - 1).format("MMMM")}</div>
                                {displayType !== CALENDAR_DISPLAY_TYPE.LIST && <WeekdaysHeader/>}
                                <div className="log-table__days">
                                    {renderDayPlaceholder(monthData.data[0].timestamp)}
                                    {monthData.data.map((entryData) =>
                                        <LogCell className="log-table__cell"
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

export default LogTable;

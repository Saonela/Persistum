import React from "react";
import './LogTable.css'
import LogCell from "../log-cell/LogCell";
import moment from "moment";
import WeekdaysHeader from "../weekdays-header/WeekdaysHeader";

function LogTable({dataLog}) {

    const renderDayPlaceholder = (weekday) => {
        console.log('%c renderDayPlaceholder', 'color: red');
        const placeholders = [];
        const limit = 7 - (weekday === 0 ? 7 : weekday); // moment.js sunday = 0
        for (let i = 0; i < limit; i++) {
            placeholders.push(<div key={i} className="log-table__days-placeholder" data-testid="day-placeholder"/>);
        }
        return placeholders;
    };

    return (
        <React.Fragment>
            <div className="log-table">
                {dataLog.reverse().map((yearData, i) =>
                    <div className="log-table__year" key={yearData.year} data-testid={'year-' + yearData.year}>
                        <div className="log-table__year-label">{yearData.year}</div>
                        {yearData.data.reverse().map((monthData, i) =>
                            <div className="log-table__month" key={monthData.month} data-testid={'month-' + monthData.month}>
                                <div className="log-table__month-label">{moment().month(monthData.month - 1).format("MMMM")}</div>
                                <WeekdaysHeader/>
                                <div className="log-table__days">
                                    {renderDayPlaceholder(monthData.data[monthData.data.length - 1].weekday)}
                                    {monthData.data.reverse().map((entryData) =>
                                        <LogCell className="log-table__cell"
                                                 key={entryData.timestamp}
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
            {!dataLog.length ?
                <div className="no-log-data-message">
                    No data have been found!
                </div> : null
            }
        </React.Fragment>
    )
}

export default LogTable;

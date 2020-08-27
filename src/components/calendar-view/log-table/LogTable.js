import React from "react";
import './LogTable.css'
import LogCell from "../log-cell/LogCell";
import moment from "moment";

function LogTable({dataLog}) {

    return (
        <div className="log-table">
            {dataLog.reverse().map((yearData, i) =>
                <div key={yearData.year} >
                <div className="log-table__year">{yearData.year}</div>
                {yearData.data.reverse().map((monthData, i) =>
                    <div key={monthData.month}>
                        <div className="log-table__month">{moment().month(monthData.month - 1).format("MMMM")}</div>
                        <div className="log-table__days">
                            {monthData.data.map((entryData) =>
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

    )
}

export default LogTable;

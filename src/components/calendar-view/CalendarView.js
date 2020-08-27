import React from "react";
import './CalendarView.css'
import {useDispatch, useSelector} from "react-redux";
import LogTable from "./log-table/LogTable";
import Legend from "../legend/Legend";
import {getCalendarDataLog} from "../../redux/logEntriesSlice";
import {toggleFilter} from "../../redux/filtersSlice";

function CalendarView() {

    const dispatch = useDispatch();

    const calendarData = useSelector(getCalendarDataLog);
    const activities = useSelector(state => state.activities);
    const filters = useSelector(state => state.filters);

    return (
            <div className="calendar-view">
                <div className="calendar-view__legend" >
                    <Legend activities={activities}
                            filters={filters}
                            onFilter={(id) => dispatch(toggleFilter(id))}/>
                </div>
                <div className="calendar-view__table" >
                    <LogTable dataLog={calendarData}/>
                </div>
            </div>
    )
}

export default CalendarView;

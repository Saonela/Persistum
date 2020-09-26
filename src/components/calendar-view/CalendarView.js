import React from "react";
import './CalendarView.css'
import {useDispatch, useSelector} from "react-redux";
import LogTable from "./log-table/LogTable";
import Legend from "../legend/Legend";
import {getCalendarDataLog} from "../../redux/slices/logEntriesSlice";
import {toggleFilter} from "../../redux/slices/filtersSlice";
import {getAllActivities} from "../../redux/slices/activitiesSlice";

function CalendarView() {

    const dispatch = useDispatch();

    const calendarData = useSelector(getCalendarDataLog);
    const activities = useSelector(getAllActivities);
    const filters = useSelector(state => state.filters);

    return (
            <div className="calendar-view">
                <div className="calendar-view__legend" >
                    <Legend activities={activities}
                            filters={filters}
                            onFilter={(id) => dispatch(toggleFilter(id))}/>
                </div>
                <div className="scroll-container">
                    <div className="calendar-view__table" >
                        <LogTable dataLog={calendarData}/>
                    </div>
                </div>
            </div>
    )
}

export default CalendarView;

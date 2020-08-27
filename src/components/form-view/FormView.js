import React, {useState} from "react";
import './FormView.css'
import Button from "@material-ui/core/Button";
import LogIsCompletedMessage from "../log-is-completed-message/LogIsCompletedMessage";
import {useDispatch, useSelector} from "react-redux";
import ActivityCreate from "./activity-create/ActivityCreate";
import ActivityList from "./activity-list/ActivityList";
import UtilityService from "../../services/utilityService";
import {addActivity, deleteActivity, updateActivity} from "../../redux/activitiesSlice";
import {getLoggedActivityIds, toggleLogEntryActivity} from "../../redux/logEntriesSlice";

function FormView() {

    const dispatch = useDispatch();
    const activities = useSelector(state => state.activities);
    const completedActivityIds = useSelector(getLoggedActivityIds);

    console.log('datalog', completedActivityIds)

    const [dayIsLogged, setDayIsLogged] = useState(false);
    const [currentDate] = useState(UtilityService.getCurrentShortTimestamp());

    return (
        <div className="form-view">
            {!dayIsLogged ?
                <div>
                    {activities.length} =
                    <div className="form-view__date">{currentDate}</div>
                    <ActivityCreate forceInputDisplay={!activities.length} onSubmit={(name) => {dispatch(addActivity({name}))}}/>
                    <ActivityList activities={activities}
                                  completedActivityIds={completedActivityIds}
                                  onToggle={(id) => {dispatch(toggleLogEntryActivity(id))}}
                                  onUpdate={(activity) => {dispatch(updateActivity(activity))}}
                                  onDelete={(activity) => {dispatch(deleteActivity(activity.id))}}/>
                    <Button className="form-view__toggle-button" variant="outlined"
                            onClick={() => setDayIsLogged(true)}>Call it a day</Button>
                </div> :
                <LogIsCompletedMessage className="form-view__log-completed-message" date={currentDate}
                                       onBack={() => setDayIsLogged(false)}/>
            }
        </div>
    );
}

export default FormView;

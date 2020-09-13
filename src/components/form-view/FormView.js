import React, {useState} from "react";
import './FormView.css'
import Button from "@material-ui/core/Button";
import LogIsCompletedMessage from "../log-is-completed-message/LogIsCompletedMessage";
import {useDispatch, useSelector} from "react-redux";
import ActivityCreate from "./activity-create/ActivityCreate";
import ActivityList from "./activity-list/ActivityList";
import UtilityService from "../../services/utilityService";
import {
    createActivity,
    deleteActivity,
    getAllActivities,
    updateActivity
} from "../../redux/slices/activitiesSlice";
import {getLoggedActivityIds, toggleLogEntryActivity, updateLogEntry} from "../../redux/slices/logEntriesSlice";
import FormDate from "./form-date/FormDate";
import {ASYNC_STATE_STATUS} from "../../redux/asyncStateStatus";
import NoActivitiesMessage from "./no-activities-message/NoActivitiesMessage";
import BackgroundLoader from "../background-loader/BackgroundLoader";

function FormView() {

    const dispatch = useDispatch();
    const activities = useSelector(getAllActivities);
    const completedActivityIds = useSelector(getLoggedActivityIds);
    const loadingStatus = useSelector(state => state.activities.status);
    const loading = loadingStatus === ASYNC_STATE_STATUS.LOADING;

    const [dayIsLogged, setDayIsLogged] = useState(false);
    const [currentDate] = useState(UtilityService.getCurrentShortTimestamp());

    return (
        <div className="app-panel app-border form-view">
            {loading && <BackgroundLoader/>}
            {!dayIsLogged ?
                <div>
                    <FormDate date={currentDate}/>
                    <ActivityCreate forceInputDisplay={!activities.length && !loading && loadingStatus !== ASYNC_STATE_STATUS.IDLE}
                                    onSubmit={(name) => {dispatch(createActivity(name))}}/>
                    <ActivityList activities={activities}
                                  completedActivityIds={completedActivityIds}
                                  onToggle={(id) => {
                                      dispatch(toggleLogEntryActivity(id));
                                      dispatch(updateLogEntry(UtilityService.getCurrentShortTimestamp()));
                                  }}
                                  onUpdate={(activity) => {dispatch(updateActivity(activity))}}
                                  onDelete={(activity) => {dispatch(deleteActivity(activity.id))}}/>
                    {!activities.length && !loading && loadingStatus !== ASYNC_STATE_STATUS.IDLE ?
                        <div className="no-activities-message" data-testid="no-activities">
                            <NoActivitiesMessage/>
                        </div>
                    :
                        <Button className="form-view__toggle-button"
                                variant="outlined"
                                color="primary"
                                aria-label="complete-day-logging"
                                onClick={() => setDayIsLogged(true)}>Call it a day</Button>
                    }
                </div> :
                <LogIsCompletedMessage className="form-view__log-completed-message"
                                       date={currentDate}
                                       onBack={() => setDayIsLogged(false)}/>
            }
        </div>
    );
}

export default FormView;

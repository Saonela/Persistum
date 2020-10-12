import React, {useEffect} from "react";
import './FormView.css'
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import ActivityCreate from "./activity-create/ActivityCreate";
import ActivityList from "./activity-list/ActivityList";
import UtilityService from "../../services/utilityService";
import {
    createActivity,
    deleteActivity,
    getAllActivities, reorderActivities, updateActivitiesOrder,
    updateActivity
} from "../../redux/slices/activitiesSlice";
import {
    getLoggedActivityIds,
    getTimestamp, resetTimestamp, setTimestamp,
    toggleLogEntryActivity,
    updateLogEntry
} from "../../redux/slices/logEntriesSlice";
import FormDate from "./form-date/FormDate";
import {ASYNC_STATE_STATUS} from "../../redux/asyncStateStatus";
import NoActivitiesMessage from "./no-activities-message/NoActivitiesMessage";
import withLoader from "../with-loader/WithLoader";
import {Link} from "react-router-dom";

function FormView({onLoadingStateChange}) {
    const dispatch = useDispatch();

    const date = useSelector(getTimestamp);
    const activities = useSelector(getAllActivities);
    const completedActivityIds = useSelector(getLoggedActivityIds);
    const loadingStatus = useSelector(state => state.activities.status);
    const loading = loadingStatus === ASYNC_STATE_STATUS.LOADING;

    onLoadingStateChange(loading);

    useEffect(() => {
        return () => {
            dispatch(resetTimestamp());
        }
    }, [dispatch]);

    const isCurrentDate = () => {
        return date === UtilityService.getCurrentShortTimestamp();
    }

    return (
        <div className="app-panel app-border form-view">
            <div className="form-view__form">
                <FormDate date={date} setDate={(date) => dispatch(setTimestamp(date))}/>
                {!isCurrentDate() && <div className="form-view__edit-message">You are not on the current date</div>}
                <ActivityCreate forceInputDisplay={!activities.length && !loading && loadingStatus !== ASYNC_STATE_STATUS.IDLE}
                                onSubmit={(name) => {dispatch(createActivity(name))}}/>
                <ActivityList activities={activities}
                              completedActivityIds={completedActivityIds}
                              onToggle={(id) => {
                                  dispatch(toggleLogEntryActivity(id));
                                  dispatch(updateLogEntry(date));
                              }}
                              onUpdate={(activity) => {dispatch(updateActivity(activity))}}
                              onDelete={(activity) => {
                                  dispatch(deleteActivity(activity.id));
                                  dispatch(updateActivitiesOrder());
                              }}
                              onDragEnd={(indexData) => {
                                  dispatch(reorderActivities(indexData));
                                  dispatch(updateActivitiesOrder());
                              }}/>
                {!loading && !activities.length && loadingStatus !== ASYNC_STATE_STATUS.IDLE &&
                    <div className="no-activities-message" data-testid="no-activities">
                        <NoActivitiesMessage/>
                    </div>
                }
                {!loading && !!activities.length &&
                <div className="form-view__footer">
                    <Link to="/log-completed">
                     <Button className="app-button app-button--outline form-view__toggle-button"
                            variant="outlined"
                            color="default"
                            size="small"
                            aria-label="complete-day-logging">Call it a day</Button>
                    </Link>
                </div>}
            </div>
        </div>
    );
}

export default withLoader(FormView);

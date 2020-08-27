import React, {useState} from 'react';
import './ActivityList.css'
import Activity from "../activity/Activity";
import NoActivitiesMessage from "../no-activities-message/NoActivitiesMessage";
import ActivityRemoveDialog from "../activity-remove-dialog/ActivityRemoveDialog";
import {CSSTransitionGroup} from 'react-transition-group'

function ActivityList({activities, completedActivityIds, onUpdate, onDelete, onToggle}) {

    const transitionDuration = 300;

    const [activityToRemove, setActivityToRemove] = useState(null);

    const handleDelete = () => {
        onDelete(activityToRemove);
        setActivityToRemove(null);
    }

    return (
        <div className="activity-list">
            <CSSTransitionGroup
                transitionName="activity-list-transition"
                transitionEnterTimeout={transitionDuration}
                transitionLeaveTimeout={transitionDuration}>
                {activities.map((activity) =>
                    <Activity key={activity.id}
                              activity={activity}
                              completed={completedActivityIds.indexOf(activity.id) >= 0}
                              onToggle={() => onToggle(activity.id)}
                              onChange={(activity) => onUpdate(activity)}
                              onDelete={() => setActivityToRemove(activity)}/>
                )}
            </CSSTransitionGroup>
            <CSSTransitionGroup
                transitionName="no-activities-transition"
                transitionEnterTimeout={transitionDuration}
                transitionLeaveTimeout={transitionDuration}>
                {activities.length &&
                <div className="activity-list__no-activities-message">
                    <NoActivitiesMessage/>
                </div>}
            </CSSTransitionGroup>
            {activityToRemove &&
            <ActivityRemoveDialog activity={activityToRemove}
                                  onConfirm={() => handleDelete()}
                                  onCancel={() => setActivityToRemove(null)}/>
            }
        </div>
    )
}

export default ActivityList;

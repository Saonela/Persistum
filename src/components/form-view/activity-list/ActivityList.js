import React from 'react';
import './ActivityList.css'
import PropTypes from "prop-types";
import Activity from "../activity/Activity";
import NoActivitiesMessage from "../no-activities-message/NoActivitiesMessage";
import ActivityRemoveDialog from "../activity-remove-dialog/ActivityRemoveDialog";
import {CSSTransitionGroup} from 'react-transition-group'

class ActivityList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activityToRemove: null
        }
    }

    handleChange(activity) {
        this.props.onUpdate(activity);
    }

    handleToggle(id) {
        this.props.onToggle([id]);
    }

    handleRemove(activity) {
        this.setState({
            activityToRemove: null
        });
        this.props.onRemove(activity);
    }

    render() {
        return (
            <div className="activity-list">
                <CSSTransitionGroup
                    transitionName="activity-list-transition"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                    {this.props.activities.map((activity) =>
                        <Activity key={activity.id}
                                  activity={activity}
                                  completed={this.props.completedActivities.indexOf(activity.id) >= 0}
                                  onToggle={this.handleToggle.bind(this, activity.id)}
                                  onChange={this.handleChange.bind(this)}
                                  onRemove={() => {
                                      this.setState({activityToRemove: activity})
                                  }}/>
                    )}
                </CSSTransitionGroup>
                <CSSTransitionGroup
                    transitionName="no-activities-transition"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                    {!this.props.activities.length &&
                    <div className="activity-list__no-activities-message">
                        <NoActivitiesMessage/>
                    </div>}
                </CSSTransitionGroup>
                {this.state.activityToRemove &&
                <ActivityRemoveDialog activity={this.state.activityToRemove}
                                      onConfirm={this.handleRemove.bind(this, this.state.activityToRemove)}
                                      onCancel={() => {this.setState({activityToRemove: null})}}/>
                }
            </div>
        )
    }
}

ActivityList.propTypes = {
    activities: PropTypes.arrayOf(Object),
    completedActivities: PropTypes.arrayOf(Number)
};

export default ActivityList;

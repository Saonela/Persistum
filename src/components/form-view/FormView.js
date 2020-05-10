import React from "react";
import './FormView.css'
import Button from "@material-ui/core/Button";
import LogIsCompletedMessage from "../log-is-completed-message/LogIsCompletedMessage";
import moment from "moment";
import {connect} from "react-redux";
import {addActivityAPI, deleteActivityAPI, updateActivityAPI} from "../../actions/activityActions";
import ActivityCreate from "./activity-create/ActivityCreate";
import {bindActionCreators} from "redux";
import ActivityList from "./activity-list/ActivityList";
import UtilityService from "../../services/utilityService";
import {toggleCurrentLogActivities} from "../../actions/dataLogActions";

class FormView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeItem: 'FORM',
            date: moment().format('YYYY-MM-DD')
    };

    }

    toggleForm() {
        this.setState((state) => {
            return {
                activeItem: state.activeItem === 'FORM' ? 'LOG_COMPLETED_MESSAGE' : 'FORM'
            }
        });
    }

    render() {
        return (
            <div className="form-view">
                {this.state.activeItem === 'FORM' ?
                    <div>
                        <div className="form-view__date">{ this.props.date }</div>
                        <ActivityCreate forceInputDisplay={!this.props.activities.length} onSubmit={this.props.addActivity.bind(this)}/>
                        <ActivityList activities={this.props.activities}
                                      completedActivities={this.props.completedActivities}
                                      onToggle={this.props.toggleActivity.bind(this)}
                                      onUpdate={this.props.updateActivity.bind(this)}
                                      onRemove={this.props.removeActivity.bind(this)}/>
                        <Button className="form-view__toggle-button" variant="outlined" onClick={this.toggleForm.bind(this)}>Call it a day</Button>
                    </div> :
                    <LogIsCompletedMessage className="form-view__log-completed-message" date={this.state.date} onBack={this.toggleForm.bind(this)}/>
                }
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const dataLog = state.dataLog[UtilityService.getCurrentShortTimestamp()];
    return {
        activities: state.activities,
        completedActivities: dataLog ? dataLog.activities : []
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addActivity: addActivityAPI, updateActivity: updateActivityAPI, toggleActivity: toggleCurrentLogActivities, removeActivity: deleteActivityAPI }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(FormView);

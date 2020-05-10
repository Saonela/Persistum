import React from "react";
import './CalendarView.css'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import LogTable from "./log-table/LogTable";

class CalendarView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="calendar-view">
                == >{JSON.stringify(this.props.activities)}
                <br></br>
                == >{JSON.stringify(this.props.dataLog)}
                <br></br>
                <LogTable dataLog={this.props.dataLog}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (() => {
    const dataLog = {}
    Object.keys(state.dataLog).forEach((key) => {
        dataLog[key] = {
            activities: state.activities.filter((activity) => state.dataLog[key].activities.indexOf(activity.id) >= 0)
        }
    });
    return {
        activities: state.activities,
        dataLog: dataLog
    }
});

const mapDispatchToProps = (dispatch) => {
    // return bindActionCreators({ addActivity, updateActivity, removeActivity: deleteActivity }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView);

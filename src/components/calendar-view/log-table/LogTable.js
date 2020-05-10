import React from "react";
import './LogTable.css'
import LogCell from "./log-cell/LogCell";
import PropTypes from "prop-types";

class LogTable extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="log-table">
                {Object.keys(this.props.dataLog).map((timestamp) =>
                    <LogCell className="log-table__cell" key={timestamp} timestamp={timestamp} activities={this.props.dataLog[timestamp].activities}/>
                )}
            </div>

        )
    }
}

LogTable.propTypes = {
    dataLog: PropTypes.object
};

export default LogTable;

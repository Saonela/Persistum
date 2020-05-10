import React from "react";
import './LogCell.css'
import PropTypes from "prop-types";

class LogCell extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="log-cell">
                <div className="log-cell__timestamp">{this.props.timestamp}</div>
                <div className="log-cell__activities">
                    {this.props.activities.map((activity) =>
                        <div className="log-cell__activity" key={activity.id}>{activity.id}</div>
                    )}
                </div>
            </div>
        )
    }
}


LogCell.propTypes = {
    timestamp: PropTypes.string,
    activities: PropTypes.array
};

export default LogCell;

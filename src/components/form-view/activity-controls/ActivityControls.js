import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import './ActivityControls.css'

class ActivityControls extends React.Component {

    handleEdit(e) {
        e.stopPropagation();
        this.props.onEdit();
    }

    handleRemove(e) {
        e.stopPropagation();
        this.props.onRemove();
    }

    render() {
        return (
            <div className="activity-controls">
                <div className="activity-controls__style"/>
                <div className="activity-controls__controls">
                    <IconButton className="activity-controls__edit-button" onClick={this.handleEdit.bind(this)}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton className="activity-controls__remove-button" onClick={this.handleRemove.bind(this)}>
                        <ClearIcon/>
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default ActivityControls;

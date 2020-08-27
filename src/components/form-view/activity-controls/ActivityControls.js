import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import './ActivityControls.css'

function ActivityControls({onEdit, onDelete}) {

    const handleEdit = (e) => {
        e.stopPropagation();
        onEdit();
    }

    const handleRemove = (e) => {
        e.stopPropagation();
        onDelete();
    }

    return (
        <div className="activity-controls">
            <div className="activity-controls__style"/>
            <div className="activity-controls__controls">
                <IconButton className="activity-controls__edit-button" role="button" aria-label="edit" onClick={(e) => handleEdit(e)}>
                    <EditIcon/>
                </IconButton>
                <IconButton className="activity-controls__remove-button" role="button" aria-label="delete" onClick={(e) => handleRemove(e)}>
                    <ClearIcon/>
                </IconButton>
            </div>
        </div>
    );
}

export default ActivityControls;

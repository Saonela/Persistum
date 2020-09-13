import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import './ActivityControls.css'
import {MoreVert} from "@material-ui/icons";
import {CSSTransitionGroup} from "react-transition-group";

const transitionDuration = 100;

function ActivityControls({onEdit, onDelete}) {

    const [showControls, setShowControls] = useState(false);

    const handleEdit = (e) => {
        e.stopPropagation();
        setShowControls(false);
        onEdit();
    }

    const handleRemove = (e) => {
        e.stopPropagation();
        setShowControls(false);
        onDelete();
    }

    return (
        <div className={"activity-controls"}>
            <CSSTransitionGroup
                transitionName="activity-controls-transition"
                transitionEnterTimeout={transitionDuration}
                transitionLeaveTimeout={transitionDuration}>
                {showControls &&
                <div className="activity-controls__controls">
                    <div className="activity-controls__style"/>
                    <IconButton className="activity-controls__edit-button" role="button" aria-label="edit"
                                onClick={(e) => handleEdit(e)}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton className="activity-controls__remove-button" role="button" aria-label="delete"
                                onClick={(e) => handleRemove(e)}>
                        <ClearIcon/>
                    </IconButton>
                </div>
                }
            </CSSTransitionGroup>
            <IconButton onClick={(e) => {
                    e.stopPropagation();
                    setShowControls(state => !state);
                }}
                className="activity-controls__expand-button"
                role="button"
                aria-label="Expand activity controls"
                color="default">
                <MoreVert/>
            </IconButton>
            <div className="activity-controls__mask"/>
        </div>
    );
}

export default ActivityControls;

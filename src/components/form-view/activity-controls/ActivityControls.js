import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import './ActivityControls.css'
import {MoreVert} from "@material-ui/icons";
import {CSSTransitionGroup} from "react-transition-group";
import ColorPickerButton from "../../color-picker-button/ColorPickerButton";

const transitionDuration = 100;

function ActivityControls({activity, onNameEditToggle, onUpdate, onDelete}) {

    const [showControls, setShowControls] = useState(false);

    const handleNameEditToggle = (e) => {
        setShowControls(false);
        onNameEditToggle();
    }

    const handleRemove = (e) => {
        setShowControls(false);
        onDelete();
    }

    return (
        <div className="activity-controls" onClick={(e) => e.stopPropagation()}>
            <CSSTransitionGroup
                transitionName="activity-controls-transition"
                transitionEnterTimeout={transitionDuration}
                transitionLeaveTimeout={transitionDuration}>
                {showControls &&
                <div className="activity-controls__controls">
                    <ColorPickerButton color={activity.style.background} onChange={onUpdate}/>
                    <IconButton className="activity-controls__edit-button" role="button" aria-label="edit" onClick={handleNameEditToggle}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton className="activity-controls__remove-button" role="button" aria-label="delete" onClick={handleRemove}>
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

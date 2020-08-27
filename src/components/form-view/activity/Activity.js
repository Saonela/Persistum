import React, {useState} from 'react';
import Icon from "@material-ui/core/Icon";
import ActivityControls from "../activity-controls/ActivityControls";
import './Activity.css'
import TextInput from "../../text-input/TextInput";

function Activity({activity, completed, onToggle, onChange, onDelete}) {

    const [editMode, setEditMode] = useState(false);

    const handleNameChange = (name) => {
        setEditMode(false);
        onChange(Object.assign({}, activity, {name: name}));
    }

    return (
        <div className={"activity " + (completed ? 'activity--completed' : '')} role="listitem" onClick={() => onToggle()}>
            {completed &&
            <div className="activity__indicator" role="alert">
                <Icon className="activity__indicator-icon">done</Icon>
            </div>
            }
            <div className={"activity__name " + (editMode ? "activity__name--edit" : "")}>
                {editMode ?
                    <TextInput className="activity__name-input"
                               value={activity.name}
                               onEnter={(name) => handleNameChange(name)}
                               onBlur={(name) => handleNameChange(name)}/> :
                    <div className="activity__name-text">{activity.name}</div>
                }
            </div>
            <ActivityControls onEdit={() => setEditMode(value => !value)} onDelete={() => onDelete()}/>
        </div>
    )
}

export default Activity;

import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import React, {useState} from "react";
import './ActivityCreate.css'
import TextInput from "../../text-input/TextInput";

function ActivityCreate({forceInputDisplay, onSubmit}) {

    const [inputVisible, setInputVisible] = useState(false);
    const [name, setName] = useState('');

    const submit = (name) => {
        if (isNameValid(name)) {
            setName('');
            setInputVisible(false);
            onSubmit(name);
        }
    }

    const toggleInput = () => {
        if (inputVisible) {
            submit(name);
        } else {
            setInputVisible(state => !state);
        }
    }

    const handleEnter = (name) => {
        setName(name);
        submit(name);
    }

    const handleBlur = (name) => {
        setName(name);
        if (!isNameValid(name)) {
            setInputVisible(false);
        }
    }

    const isNameValid = (name) => {
        return name && name.trim();
    }

    return (
        <div className="activity-create">
            { (inputVisible || forceInputDisplay) &&
                <TextInput id="name"
                           className="activity-create__input"
                           label="Activity"
                           value={name}
                           onBlur={(value) => handleBlur(value)}
                           onEnter={(value) => handleEnter(value)}/>
            }
            <IconButton className="activity-create__toggle-button"
                        title="Add"
                        aria-label="toggle"
                        onClick={() => toggleInput()}>
                <AddIcon/>
            </IconButton>
        </div>
    )
}

export default ActivityCreate;

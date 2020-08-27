import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";

function TextInput({id, label, value, onEnter, onBlur}) {

    const [inputValue, setInputValue] = useState(value);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onEnter(inputValue);
        }
    }

    return (
        <TextField autoFocus className="text-input" style={{'width': '100%'}}
               id={id}
               label={label}
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               onBlur={() => onBlur(inputValue)}
               onKeyPress={(e) => handleKeyPress(e)}/>
    );
}

export default TextInput;

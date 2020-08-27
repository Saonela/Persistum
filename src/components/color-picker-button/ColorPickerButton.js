import React, {useState} from "react";
import {ChromePicker} from 'react-color';
import './ColorPickerButton.css'

function ColorPickerButton({color, onChange}) {

    const [showColorPicker, setShowColorPicker] = useState(false);

    const container = React.createRef();

    const toggleColorPicker = () => {
        setShowColorPicker(value => !value);
        container.current.focus();
    }

    return (
        <div className="color-picker-button" style={{'background-color': color}}>
            <div className="color-picker-button__trigger" onClick={() => toggleColorPicker()}/>
            <div className="color-picker-button__wrapper"
                 style={{"visibility": showColorPicker ? "visible" : "hidden"}}
                 ref={container}
                 tabIndex="0"
                 onBlur={() => setShowColorPicker(false)}>
                <ChromePicker color={color} onChangeComplete={(value) => onChange(value.hex)}/>
            </div>
        </div>
    );
}

export default ColorPickerButton;

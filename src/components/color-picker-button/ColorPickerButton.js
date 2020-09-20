import React, {useEffect, useRef, useState} from "react";
import {TwitterPicker} from 'react-color';
import './ColorPickerButton.css'

function ColorPickerButton({color, onChange}) {

    const [showColorPicker, setShowColorPicker] = useState(false);

    const refShowColorPicker = useRef(showColorPicker);

    useEffect(() => {
        refShowColorPicker.current = showColorPicker;
    }, [showColorPicker]);

    useEffect(() => {
        const closeColorPicker = () => {
            if (refShowColorPicker.current) {
                setShowColorPicker(false);
            }
        };
        window.addEventListener('click', closeColorPicker);
        return () => {
            window.removeEventListener('click', closeColorPicker);
        }
    }, []);

    const toggleColorPicker = (e) => {
        setShowColorPicker(value => !value);
    }

    const handleColorChange = (color) => {
        onChange(color);
    }

    return (
        <div className="color-picker-button">
            <button className="color-picker-button__trigger"
                    aria-label="Toggle color picker"
                    onClick={(e) => toggleColorPicker(e)}>
                <div className="color-picker-button__trigger-visual"
                     data-testid="color-picker-trigger-visual"
                     style={{'backgroundColor': color}}/>
            </button>
            {showColorPicker &&
                <div className="color-picker-button__wrapper"
                     data-testid="color-picker"
                     onClick={(e) => e.stopPropagation()}>
                <TwitterPicker color={color}
                               triangle={"hide"}
                               onChange={(value) => handleColorChange(value.hex)}/>
                </div>
            }
        </div>
    );
}

export default ColorPickerButton;

import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

class TextInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || ''
        }
    }
    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.props.onEnter(this.state.value);
        }
    }

    handleBlur() {
        this.props.onBlur(this.state.value);
    }

    render() {
        return (
            <TextField autoFocus className="text-input" style={{'width': '100%'}}
                       label={this.props.label}
                       value={this.state.value}
                       onChange={this.handleChange.bind(this)}
                       onBlur={this.handleBlur.bind(this)}
                       onKeyPress={this.handleKeyPress.bind(this)}/>
        );
    }
}

TextInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onEnter: PropTypes.func,
    onBlur: PropTypes.func
};

export default TextInput;

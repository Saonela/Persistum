import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import React from "react";
import './ActivityCreate.css'
import TextInput from "../../text-input/TextInput";
import PropTypes from "prop-types";

class ActivityCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            showInput: false
        };
    }

    submit(name) {
        if (this.isNameValid(name)) {
            this.setState({
                value: '',
                showInput: false
            });
            this.props.onSubmit(name);
        }
    }

    toggleInput() {
        if (this.state.showInput && this.isNameValid(this.state.value)) {
            this.submit(this.state.value);
        } else {
            this.setState((state) => {
                return {
                    showInput: !state.showInput
                }
            })
        }
    }

    handleEnter(name) {
        this.setState({
            value: name
        });
        this.submit(name);
    }

    handleBlur(name) {
        this.setState({
            value: name
        });
    }

    isNameValid(name) {
        return name && name.trim();
    }

    render() {
        return (
            <div className="form-create">
                { (this.state.showInput || this.props.forceInputDisplay) &&
                    <TextInput className="form-create__input" label="Activity" value={this.state.value} onBlur={this.handleBlur.bind(this)} onEnter={this.handleEnter.bind(this)}/>
                }
                <IconButton className="form-create__toggle-button" aria-label="toggle" onClick={this.toggleInput.bind(this)}>
                    <AddIcon/>
                </IconButton>
            </div>
        )
    }
}

ActivityCreate.propTypes = {
    onSubmit: PropTypes.func
};

export default ActivityCreate;

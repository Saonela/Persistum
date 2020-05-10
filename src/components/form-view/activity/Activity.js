import React from 'react';
import Icon from "@material-ui/core/Icon";
import ActivityControls from "../activity-controls/ActivityControls";
import './Activity.css'
import TextInput from "../../text-input/TextInput";
import PropTypes from 'prop-types'

class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        }
    }

    toggleEdit() {
        this.setState((state) => {
            return {
                editMode: !state.editMode
            }
        });
    }

    toggleState() {
        this.props.onToggle();
    }

    handleNameChange(name) {
        this.setState({editMode: false});
        this.props.onChange(Object.assign({}, this.props.activity, {name: name}));
    }

    handleRemove() {
        this.props.onRemove();
    }

    render() {
        return (
            <div className={"activity " + (this.props.completed ? 'activity--completed' : '')} onClick={this.toggleState.bind(this)}>
                {this.props.completed &&
                    <div className="activity__indicator">
                        <Icon className="activity__indicator-icon">done</Icon>
                    </div>
                }
                <div className={"activity__name " + (this.state.editMode ? "activity__name--edit" : "")}>
                    {this.state.editMode ?
                        <TextInput className="activity__name-input" value={this.props.activity.name} onEnter={this.handleNameChange.bind(this)} onBlur={this.handleNameChange.bind(this)}/> :
                        <div className="activity__name-text">{this.props.activity.name}</div>
                    }
                </div>
                <ActivityControls onEdit={this.toggleEdit.bind(this)} onRemove={this.handleRemove.bind(this)}/>
            </div>
        )
    }
}

Activity.propTypes = {
    activity: PropTypes.object,
    completed: PropTypes.bool
};

export default Activity;

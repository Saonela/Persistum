import React from "react";
import './LogIsCompletedMessage.css'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

class LogIsCompletedMessage extends React.Component {

    goBack() {
        this.props.onBack();
    }

    render() {
        return (
            <div className="log-is-completed-message">
                <div className="log-is-completed-message__date">
                    {this.props.date}
                </div>
                <div className="log-is-completed-message__illustration">
                    <CheckCircleOutlineIcon/>
                </div>
                <div className="log-is-completed-message__congratulations">
                    Your day has been logged !
                </div>
                <div className="message-navigation-options">
                    <div className='message-navigation-options__to-form'>
                        <div>If you have missed something</div>
                        <Button className="message-navigation-options__button" variant="outlined" size="small" onClick={this.goBack.bind(this)}>Back to logging</Button>
                    </div>
                    <div className='message-navigation-options__to-calendar'>
                        <div>To review overall statistics</div>
                        <Link to="/calendar">
                            <Button className="message-navigation-options__button" variant="outlined" size="small">Go to calendar</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogIsCompletedMessage;

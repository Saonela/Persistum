import React from "react";
import './LogIsCompletedMessage.css'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import FormDate from "../form-view/form-date/FormDate";

function LogIsCompletedMessage({date, onBack}) {

    return (
        <div className="log-is-completed-message">
            <FormDate date={date}/>
            <div className="log-is-completed-message__congratulations">
                <div className="log-is-completed-message__illustration">
                    <CheckCircleOutlineIcon/>
                </div>
                Your day has been logged !
            </div>
            <div className="message-navigation-options">
                <div className='message-navigation-options__to-form'>
                    <Button className="app-button app-button--outline message-navigation-options__button" variant="outlined" size="small" onClick={() => onBack()}>Back to logging</Button>
                    <div>If you have missed something</div>
                </div>
                <div className='message-navigation-options__to-calendar'>
                    <Link to="/calendar">
                        <Button className="app-button app-button--outline message-navigation-options__button" variant="outlined" size="small">Go to calendar</Button>
                    </Link>
                    <div>To review overall statistics</div>
                </div>
            </div>
        </div>
    );
}

export default LogIsCompletedMessage;

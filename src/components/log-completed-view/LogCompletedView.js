import React from "react";
import './LogCompletedView.css'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import FormDate from "../form-view/form-date/FormDate";
import {useSelector} from "react-redux";
import {getTimestamp} from "../../redux/slices/logEntriesSlice";

function LogCompletedView() {
    const date = useSelector(getTimestamp);
    return (
        <div className="app-panel app-border form-view">
            <div className="log-is-completed-message">
                <FormDate disabled date={date}/>
                <div className="log-is-completed-message__congratulations">
                    <div className="log-is-completed-message__illustration">
                        <CheckCircleOutlineIcon/>
                    </div>
                    Your day has been logged !
                </div>
                <div className="message-navigation-options">
                    <div className='message-navigation-options__to-form'>
                        <Link to="/form">
                            <Button className="app-button app-button--outline message-navigation-options__button" variant="outlined" size="small">Back to logging</Button>
                        </Link>
                        <div>If you have missed something</div>
                    </div>
                    <div className='message-navigation-options__to-calendar'>
                        <Link to="/calendar">
                            <Button className="app-button app-button--outline message-navigation-options__button" variant="outlined" size="small">Go to calendar</Button>
                        </Link>
                        <div>To review your progress</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogCompletedView;

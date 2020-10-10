import React from "react";
import "./NoLogDataMessage.css"
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

const NoLogDataMessage = () => (
    <div className="no-log-data-message">
        <p>No data have been found!</p>
        <Link to="/form">
            <Button className="app-button app-button--outline" variant="outlined" size="small">Go to Form</Button>
        </Link>
    </div>
);

export default NoLogDataMessage;

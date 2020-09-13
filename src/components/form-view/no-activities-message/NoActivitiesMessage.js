import React from "react";
import './NoActivitiesMessage.css'

function NoActivitiesMessage() {
    return (
        <div className="no-activities-message" role="alert">
            You have no activities.<br/>
            Go, create one!
        </div>
    )
}

export default NoActivitiesMessage

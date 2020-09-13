import {CSSTransitionGroup} from "react-transition-group";
import React from "react";
import "./FadeTransition.css"

function FadeTransition({children}) {
    return (
        <CSSTransitionGroup transitionName="fade-transition"
                            transitionEnterTimeout={150}
                            transitionLeaveTimeout={150}>
            {children}
        </CSSTransitionGroup>
    );
}

export default FadeTransition;

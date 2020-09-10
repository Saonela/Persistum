import React from "react";
import {useDispatch} from "react-redux";
import {setUser} from "../../../redux/slices/userSlice";
import {fetchActivities} from "../../../redux/slices/activitiesSlice";
import {fetchLogEntries} from "../../../redux/slices/logEntriesSlice";
import {withRouter} from "react-router-dom";

function withAuthHandler(WrappedComponent) {
    return withRouter(({history}) => {
        const dispatch = useDispatch();

        function handleAuthSuccess(user) {
            dispatch(setUser({id: user.uid, email: user.email}));
            dispatch(fetchActivities());
            dispatch(fetchLogEntries());
            history.push('/form');
        }

        return <WrappedComponent onAuthSuccess={(user) => handleAuthSuccess(user)} />;
    });
}

export default withAuthHandler;

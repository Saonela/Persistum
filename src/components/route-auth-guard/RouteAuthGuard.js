import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";

function RouteAuthGuard({children, history, isAuthenticated}) {

    useEffect(() => {
        redirectIfNotAuth(history.location);

        const unsubsribe = history.listen((location) => {
            redirectIfNotAuth(location);
        });
        return () => {
            unsubsribe();
        };
    }, [isAuthenticated]);

    const redirectIfNotAuth = (location) => {
        if (!isAuthenticated &&
            location.pathname !== '/' &&
            location.pathname !== '/login' &&
            location.pathname !== '/register') {
            history.push('/login');
        }
    };

    return <React.Fragment>{children}</React.Fragment>
}

export default withRouter(RouteAuthGuard);

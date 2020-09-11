import React, {useState} from "react";
import BackgroundLoader from "../background-loader/BackgroundLoader";

function withLoader(WrappedComponent) {
    return (props) => {
        const [loading, setLoading] = useState(false);

        const handleLoadingStateChange = (state) => {
            setLoading(state);
        }

        return (
            <React.Fragment>
                {loading && <BackgroundLoader className="hoc-loader"/>}
                <WrappedComponent {...props} onLoadingStateChange={(user) => handleLoadingStateChange(user)} />
            </React.Fragment>
        );
    };
}

export default withLoader;

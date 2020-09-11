import React from "react";
import "./BackgroundLoader.css"
import Loader from 'react-loader-spinner'

const color = getComputedStyle(document.documentElement).getPropertyValue('--color-theme');

function BackgroundLoader() {
    return (
        <React.Fragment>
        <div className="background-loader"/>
        <Loader
            className="background-loader__loader"
            type="ThreeDots"
            color={color}
            height={100}
            width={100}
        />
        </React.Fragment>
    )
}

export default BackgroundLoader;

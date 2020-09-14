import React from "react";
import "./LandingView.css"
import list from "../../assets/landing/list.svg"
import calendar from "../../assets/landing/calendar.svg"
import stats from "../../assets/landing/stats.svg"
import {Link, withRouter} from "react-router-dom";
import {useSelector} from "react-redux";

function LandingView() {
    const user = useSelector(state => state.user);

    return (
        <React.Fragment>
            <div className="landing-wrapper">
                <div className="background-figure background-figure-1"/>
                <div className="figures-group">
                    <div className="background-figure background-figure-2"/>
                    <div className="background-figure background-figure-3"/>
                    <div className="background-figure background-figure-4"/>
                </div>
                <div className="landing">
                    <div className="landing__content">
                        <h1 className="landing__header">Welcome to <span>Persistum.</span></h1>
                        <p className="landing__description">
                            Never let your routine get out of order. <br/>
                            Easy way to organize your tasks or goals. <br/>
                            Log and track your activities. <br/>
                            Overview your progress. <br/>
                            And keep going to achieve your goals!</p>
                        <figure className="main-illustration">
                            <img className="main-illustration__list" src={list} alt="list-illustration"/>
                            <img className="main-illustration__calendar" src={calendar} alt="calendar-illustration"/>
                            <img className="main-illustration__stats" src={stats} alt="stats-illustration"/>
                        </figure>
                        <section className="landing__get-started">
                            <Link to={user ? "/form" : "/register"} tabIndex="-1">
                                <button className="main-button">Get started</button>
                            </Link> or
                            <Link to="/login" tabIndex="-1">
                                <button className="secondary-button">Login</button>
                            </Link>
                        </section>
                    </div>
                    <footer className="landing__footer">
                        <a href="mailto:&#107;&#118;&#097;&#108;&#105;&#110;&#116;&#101;&#108;&#105;&#115;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;">kvalintelis@gmail.com</a>
                        <p>2020</p>
                    </footer>
                </div>
            </div>
        </React.Fragment>
    )
}

export default withRouter(LandingView);

import React from "react";
import './Navigation.css'
import {Link, withRouter} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
              activeItem: 'FORM'
        };
    }

    componentWillMount() {
        this.unlisten = this.props.history.listen((location) => {
            if (location.pathname === '/calendar') {
                this.setActiveItem('FORM')
            }
            if (location.pathname === '/calendar') {
                this.setActiveItem('CALENDAR')
            }
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    setActiveItem(activeItem) {
        this.setState({activeItem: activeItem});
    }

    render() {
        return (
            <div className="navigation">
                <Link to="/calendar" onClick={this.setActiveItem.bind(this, 'CALENDAR')}>
                    <IconButton className="navigation__button-calendar" color={this.state.activeItem === 'CALENDAR' ? 'primary' : 'default'}>
                        <DateRangeIcon/>
                    </IconButton>
                </Link>
                <Link to="/" onClick={this.setActiveItem.bind(this, 'FORM')}>
                    <IconButton className="navigation__button-form" color={this.state.activeItem === 'FORM' ? 'primary' : 'default'}>
                        <PlaylistAddCheckIcon/>
                    </IconButton>
                </Link>
            </div>
        );
    }
}

export default withRouter(Navigation);

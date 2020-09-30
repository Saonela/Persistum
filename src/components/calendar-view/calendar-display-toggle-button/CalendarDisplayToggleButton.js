import "./CalendarDisplayToggleButton.css"
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import {Reorder, ViewComfy} from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import {CALENDAR_DISPLAY_TYPE} from "../../../types/settings";

function CalendarDisplayToggleButton({calendarDisplayType, onToggle}) {
    return (
        <Tooltip disableFocusListener
                 enterTouchDelay={0}
                 leaveTouchDelay={1500}
                 title="Toggle calendar view"
                 placement="bottom"
                 arrow>
            <div>
                {calendarDisplayType === CALENDAR_DISPLAY_TYPE.GRID &&
                    <IconButton aria-label={"Calendar grid display"}
                                onClick={() => onToggle(CALENDAR_DISPLAY_TYPE.LIST)}>
                        <ViewComfy/>
                    </IconButton>
                }
                {calendarDisplayType === CALENDAR_DISPLAY_TYPE.LIST &&
                    <IconButton aria-label={"Calendar list display"}
                                onClick={() => onToggle(CALENDAR_DISPLAY_TYPE.GRID)}>
                        <Reorder/>
                    </IconButton>
                }
            </div>
        </Tooltip>
    )
}

export default CalendarDisplayToggleButton;

import React from "react";
import {render, screen} from "@testing-library/react";
import CalendarDisplayToggleButton from "./CalendarDisplayToggleButton";
import {fireEvent} from "@testing-library/dom";
import {CALENDAR_DISPLAY_TYPE} from "../../../types/settings";

describe('CalendarDisplayToggleButton', () => {

    it('should show grid view icon', () => {
        render(<CalendarDisplayToggleButton calendarDisplayType={CALENDAR_DISPLAY_TYPE.GRID}/>)
        screen.getByRole('button', {name: 'Calendar grid display'});
        expect(screen.queryByRole('button', {name: 'Calendar list display'})).not.toBeInTheDocument();
    });

    it('should show list view icon', () => {
        render(<CalendarDisplayToggleButton calendarDisplayType={CALENDAR_DISPLAY_TYPE.LIST}/>)
        screen.getByRole('button', {name: 'Calendar list display'});
        expect(screen.queryByRole('button', {name: 'Calendar grid display'})).not.toBeInTheDocument();
    });

    it('should should emit grid toggle on click', () => {
        const spy = jest.fn();
        render(<CalendarDisplayToggleButton calendarDisplayType={CALENDAR_DISPLAY_TYPE.GRID} onToggle={spy}/>)
        fireEvent.click(screen.getByRole('button', {name: 'Calendar grid display'}));
        expect(spy).toHaveBeenCalledWith(CALENDAR_DISPLAY_TYPE.LIST);
    });

    it('should should emit list toggle on click', () => {
        const spy = jest.fn();
        render(<CalendarDisplayToggleButton calendarDisplayType={CALENDAR_DISPLAY_TYPE.LIST} onToggle={spy}/>)
        fireEvent.click(screen.getByRole('button', {name: 'Calendar list display'}));
        expect(spy).toHaveBeenCalledWith(CALENDAR_DISPLAY_TYPE.GRID);
    });
});

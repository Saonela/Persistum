import React from 'react';
import {createMemoryHistory} from "history";
import {render, screen} from "@testing-library/react";
import {Router} from "react-router-dom";
import {fireEvent} from "@testing-library/dom";
import Header from "./Header";

const MUI_PRIMARY_COLOR_CLASS = 'MuiIconButton-colorPrimary';

it('should display active navigation item', () => {
    const history = createMemoryHistory()
    history.push('/form');
    render(<Router history={history}><Header/></Router>)
    const statisticsLinkButton = screen.getByRole('button', {name: 'Statistics link'});
    const calendarLinkButton = screen.getByRole('button', {name: 'Calendar link'});
    const formLinkButton = screen.getByRole('button', {name: 'Form link'});
    expect(statisticsLinkButton).not.toHaveClass(MUI_PRIMARY_COLOR_CLASS);
    expect(calendarLinkButton).not.toHaveClass(MUI_PRIMARY_COLOR_CLASS);
    expect(formLinkButton).toHaveClass(MUI_PRIMARY_COLOR_CLASS);
    screen.getByText('Activities');

    fireEvent.click(calendarLinkButton);
    expect(statisticsLinkButton).not.toHaveClass(MUI_PRIMARY_COLOR_CLASS);
    expect(calendarLinkButton).toHaveClass(MUI_PRIMARY_COLOR_CLASS);
    expect(formLinkButton).not.toHaveClass(MUI_PRIMARY_COLOR_CLASS);
    expect(history.location.pathname).toBe('/calendar');
    screen.getByText('Calendar');

    fireEvent.click(statisticsLinkButton);
    expect(statisticsLinkButton).toHaveClass(MUI_PRIMARY_COLOR_CLASS)
    expect(calendarLinkButton).not.toHaveClass(MUI_PRIMARY_COLOR_CLASS)
    expect(formLinkButton).not.toHaveClass(MUI_PRIMARY_COLOR_CLASS)
    expect(history.location.pathname).toBe('/statistics');
    screen.getByText('Statistics');
});

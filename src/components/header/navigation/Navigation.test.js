import React from 'react';
import Navigation from "./Navigation";
import {render} from "@testing-library/react";
import {fireEvent} from "@testing-library/dom";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

const MUI_PRIMARY_COLOR_CLASS = 'MuiIconButton-colorPrimary';

it('should display active item', () => {
    const history = createMemoryHistory()
    history.push('/form');
    const {getByRole} = render(<Router history={history}><Navigation/></Router>)
    const calendarLinkButton = getByRole('button', {name: 'Calendar link'});
    const formLinkButton = getByRole('button', {name: 'Form link'});
    expect(calendarLinkButton).not.toHaveClass(MUI_PRIMARY_COLOR_CLASS)
    expect(formLinkButton).toHaveClass(MUI_PRIMARY_COLOR_CLASS)

    fireEvent.click(calendarLinkButton);
    expect(calendarLinkButton).toHaveClass(MUI_PRIMARY_COLOR_CLASS)
    expect(formLinkButton).not.toHaveClass(MUI_PRIMARY_COLOR_CLASS)
});

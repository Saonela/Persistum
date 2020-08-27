import React from 'react';
import Header from "./Header";
import {render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";

it('displays main logo', () => {
    const {getByRole} = render(<BrowserRouter><Header/></BrowserRouter>);
    getByRole('img', {name: 'Logo'});
});

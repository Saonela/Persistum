import React from "react";
import {render} from "@testing-library/react";
import WeekdaysHeader from "./WeekdaysHeader";

describe('WeekdaysHeader', () => {
    it('should match snapshot', () => {
        const {asFragment} = render(<WeekdaysHeader/>);
        expect(asFragment()).toMatchSnapshot();
    });
});

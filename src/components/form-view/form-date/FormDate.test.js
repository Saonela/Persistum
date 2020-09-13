import {render} from "@testing-library/react";
import React from "react";
import FormDate from "./FormDate";

jest.mock('moment', () => {
    let input;
    const mMoment = {
        format: (format) => {
            return jest.requireActual('moment')(input).format(format);
        }
    };
    return jest.fn((params) => {
        input = params;
        return mMoment
    });
});

describe('FormDate', () => {

    it('should display date', () => {
        const {getByText} = render(<FormDate date={'2020-09-01'}/>);
        getByText('Tuesday 01');
        getByText('September');
        getByText('2020');
    });

});

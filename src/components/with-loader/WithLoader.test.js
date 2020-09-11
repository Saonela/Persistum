import React from "react";
import {shallow} from "enzyme";
import withLoader from "./WithLoader";

describe('WithLoader', () => {

    let wrapper;

    let DummyComponent;

    beforeEach(() => {
        DummyComponent = ({onAuthSuccess}) => {};
        const DummyWithHOC = withLoader(DummyComponent);
        wrapper = shallow(<DummyWithHOC/>);
    });

    it('should handle auth success', async () => {
        let component = wrapper.find(DummyComponent);
        expect(wrapper.exists('.hoc-loader')).toBeFalsy();
        await component.prop('onLoadingStateChange')(true);
        expect(wrapper.exists('.hoc-loader')).toBeTruthy();
        await component.prop('onLoadingStateChange')(false);
        expect(wrapper.exists('.hoc-loader')).toBeFalsy();
    });
});

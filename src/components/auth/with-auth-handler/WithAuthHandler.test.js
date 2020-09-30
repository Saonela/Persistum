import React from "react";
import {shallow} from "enzyme";
import withAuthHandler from "./WithAuthHandler";
import {useDispatch} from "react-redux";


jest.mock('react-redux', () => ({
    useDispatch: jest.fn(() => {}),
}));

jest.mock("../../../redux/slices/userSlice", () => ({
    setUser: args => args
}));

jest.mock("../../../redux/slices/activitiesSlice", () => ({
    fetchActivities: args => args
}));

jest.mock("../../../redux/slices/logEntriesSlice", () => ({
    fetchLogEntries: args => args
}));

describe('WithAuthHandlerForm', () => {

    let wrapper;
    const mockDispatchFn = jest.fn();
    const pushSpy = jest.fn();

    let DummyComponent;

    beforeEach(() => {
        const history = {
            listen: () => {},
            push: pushSpy,
            location: {
                pathname: '/login'
            }
        };
        useDispatch.mockReturnValue(mockDispatchFn);
        DummyComponent = ({onAuthSuccess}) => {};
        const DummyWithHOC = withAuthHandler(DummyComponent);
        wrapper = shallow(<DummyWithHOC.WrappedComponent history={history}/>);
    });

    it('should handle auth success', async () => {
        let component = wrapper.find(DummyComponent);
        await component.prop('onAuthSuccess')({uid: '1234', email: 'John@mail.com'});
        expect(mockDispatchFn).toHaveBeenCalledWith({id: '1234', email: 'John@mail.com'});
        expect(mockDispatchFn).toHaveBeenCalledTimes(4);
        expect(pushSpy).toHaveBeenCalledWith('/form');
    });
});

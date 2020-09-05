import React from "react";
import LoginView from "./LoginView";
import {shallow} from "enzyme";
import {useDispatch} from "react-redux";
import LoginForm from "./login-form/LoginForm";

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(() => {}),
}));

jest.mock("../../redux/slices/userSlice", () => ({
    setUser: args => args
}));

jest.mock("../../redux/slices/activitiesSlice", () => ({
    fetchActivities: args => args
}));

jest.mock("../../redux/slices/logEntriesSlice", () => ({
    fetchLogEntries: args => args
}));

describe('LoginView', () => {

    let wrapper;
    const mockDispatchFn = jest.fn();
    const pushSpy = jest.fn();

    beforeEach(() => {
        const history = {
            listen: () => {},
            push: pushSpy,
            location: {
                pathname: '/form'
            }
        };
        useDispatch.mockReturnValue(mockDispatchFn);
        wrapper = shallow(<LoginView.WrappedComponent history={history}/>);
    });

    it('should set user and redirect on login', () => {
        let component = wrapper.find(LoginForm);
        component.prop('onLogin')({email: 'john@mail.com'});
        expect(mockDispatchFn).toHaveBeenCalledWith({email: 'john@mail.com'});
        expect(mockDispatchFn).toHaveBeenCalledTimes(3);
        expect(pushSpy).toHaveBeenCalledWith('/form');
    });
});

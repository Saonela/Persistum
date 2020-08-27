import React from "react";
import LoginView from "./LoginView";
import {shallow} from "enzyme";
import {useDispatch} from "react-redux";
import LoginForm from "./login-form/LoginForm";

jest.mock('../../services/api/authAPIService', () => {
    return {
        login(email, pass) {
            return Promise.resolve({
                user: {
                    email: email
                }
            });
        }
    }
});

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(() => {}),
}));

jest.mock("../../redux/userSlice", () => ({
    setUser: args => args
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

    it('should set user and redirect on login',  async () => {
        let component = wrapper.find(LoginForm);
        await component.prop('onSubmit')('john@mail.com', '1234')
        expect(mockDispatchFn).toHaveBeenCalledWith({email: 'john@mail.com'});
        expect(pushSpy).toHaveBeenCalledWith('/form')
    });
});

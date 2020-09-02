import React from "react";
import {shallow} from "enzyme";
import RegisterView from "./RegisterView";
import RegisterForm from "./register-form/RegisterForm";
import {useDispatch} from "react-redux";

jest.mock('../../services/api/authAPIService', () => {
    return {
        register(email, pass) {
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

jest.mock("../../redux/slices/userSlice", () => ({
    setUser: args => args
}));


describe('RegisterView', () => {

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
        wrapper = shallow(<RegisterView.WrappedComponent history={history}/>);
    });

    it('should set user and redirect on register',  async () => {
        let component = wrapper.find(RegisterForm);
        await component.prop('onSubmit')('john@mail.com', '1234')
        expect(mockDispatchFn).toHaveBeenCalledWith({email: 'john@mail.com'});
        expect(pushSpy).toHaveBeenCalledWith('/form')
    });
});

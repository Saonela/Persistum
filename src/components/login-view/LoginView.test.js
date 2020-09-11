import React from "react";
import {shallow} from "enzyme";
import AuthForm from "../auth/auth-form/AuthForm";
import {PureLoginView} from "./LoginView"

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

describe('LoginView', () => {

    let wrapper;
    const authSpy = jest.fn();
    const loaderSpy = jest.fn();

    beforeEach(() => {
        wrapper = shallow(<PureLoginView onAuthSuccess={authSpy} onLoadingStateChange={loaderSpy}/>);
    });

    it('should login', async () => {
        let component = wrapper.find(AuthForm);
        await component.prop('onSubmit')('john@mail.com', '1234');
        expect(loaderSpy).toHaveBeenCalledWith(true);
        expect(authSpy).toHaveBeenCalledWith({email: 'john@mail.com'});
        expect(loaderSpy).toHaveBeenCalledWith(false);
    });
});

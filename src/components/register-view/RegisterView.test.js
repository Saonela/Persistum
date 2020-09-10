import React from "react";
import {shallow} from "enzyme";
import {PureRegisterView} from "./RegisterView";
import AuthForm from "../auth/auth-form/AuthForm";

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

describe('RegisterView', () => {

    let wrapper;
    const authSpy = jest.fn();

    beforeEach(() => {
        wrapper = shallow(<PureRegisterView onAuthSuccess={authSpy}/>);
    });

    it('should register', async () => {
        let component = wrapper.find(AuthForm);
        await component.prop('onSubmit')('john@mail.com', '1234')
        expect(authSpy).toHaveBeenCalledWith({email: 'john@mail.com'});
    });
});

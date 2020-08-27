import React from 'react';
import {mount} from "enzyme";
import RouteAuthGuard from "./RouteAuthGuard";

it('should redirect if not authenticated', () => {
    let callback;
    const pushSpy = jest.fn();
    const history = {
        listen: (func) => {
            callback = func;
        },
        push: pushSpy,
        location: {
            pathname: '/form'
        }
    };

    mount(<RouteAuthGuard.WrappedComponent {...{history, isAuthenticated: false}}/>);
    expect(pushSpy).toHaveBeenCalled();
    pushSpy.mockClear();
    callback({pathname: '/calendar'});
    expect(pushSpy).toHaveBeenCalledWith('/login');
    pushSpy.mockClear();

    mount(<RouteAuthGuard.WrappedComponent {...{history, isAuthenticated: true}}/>);
    expect(pushSpy).not.toHaveBeenCalled();
});

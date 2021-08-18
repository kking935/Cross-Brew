import configureMockStore from 'redux-mock-store';

import { LoginResponse } from '../@types';

import { 
    reducer, 
    initialState, 
    loginSuccess,
    LoginState,
    LOGIN
} from './login-reducer';

const mockStore = configureMockStore()({});

describe('Login reducer', () => {
    const loginResponse: LoginResponse = {
        token: 'fauxtoken'
    }
  
    beforeEach(() => {
        mockStore.clearActions();
    });

    it('logins in the user', () => {
        expect(reducer(undefined, loginSuccess(loginResponse))).toEqual({
            token: loginResponse.token
        });
    });

    it('uses a supplied state', () => {
        const suppliedState: LoginState = {...initialState};
        expect(reducer(suppliedState, loginSuccess(loginResponse))).toEqual({
            token: loginResponse.token
        });
    });
  
    it('handles a successful login', () => {
        const response: LoginResponse = {
            token: 'fauxtoken'
        }
  
        const expectedActions = [
            {
                type: LOGIN,
                payload: { 
                    token: response.token
                }
            }
        ];
      
        mockStore.dispatch(loginSuccess(response));
        expect(mockStore.getActions()).toEqual(expectedActions);
    });  
});

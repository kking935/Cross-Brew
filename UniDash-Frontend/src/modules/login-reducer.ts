import { LoginResponse } from '../@types';

/*** CONSTANTS ***/
export const LOGIN = 'loginReducer/LOGIN';
export type LOGINN = typeof LOGIN;

/*** ACTIONS ***/
export interface Login {
    type: LOGINN;
    payload: LoginResponse;
  }
  
export type LoginAction = Login;
  
/*** ACTION CREATORS ***/
export const loginSuccess = (loginResponse: LoginResponse): Login => {
    return {
        type: LOGIN,
        payload: loginResponse
    };
};

/*** REDUCER ***/

export interface LoginState {
    token: string;
  }
  
export const initialState: LoginState = {
    token: ''
};
  
export const reducer = (
    state: LoginState = initialState,
    action: LoginAction
): LoginState => {
    switch (action.type) {
    case LOGIN:
        return {
            ...state,
            token: action.payload.token
        };
        /* istanbul ignore next */
    default:
        return {
            ...state
        };
    }
};
  


export const LOGOUT = 'loginReducer/LOGOUT';
export type LOGOUTT = typeof LOGOUT;

export interface Logout {
  type: LOGOUTT;
}

export const clearStoreLogout = (): Logout => {
    return {
        type: LOGOUT
    };
};

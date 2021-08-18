import { combineReducers } from 'redux';

import * as loginReducer from './login-reducer';

/*
 * Root state of the app
 * Contains every substate of the app
 */
export interface Store {
  loginReducer: loginReducer.LoginState;
}

/*
 * Initial state of the app
 */
export const initialState: Store = {
    loginReducer: loginReducer.initialState
};

/*
 * Root reducer of the app
 * Returned reducer will be the type of Reducer<Store>
 */
const appReducer = combineReducers<Store>({
    loginReducer: loginReducer.reducer
});

/*
 * Root reducer of the app
 * Returned reducer will be the type of Reducer<Store>
 */
export const rootReducer = (state: Store | undefined, action: any) => {
    if (action.type === loginReducer.LOGOUT) {
        state = {
            ...initialState
        };
    }
    return appReducer(state, action);
};

export default rootReducer;

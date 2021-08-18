import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { Store } from '../../modules/root-reducer';
import { loginSuccess, clearStoreLogout } from '../../modules/login-reducer';
import axiosInstance from '../../axios/axios-instance';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../../@types';

interface OwnProps extends RouteProps {
  component: React.ComponentType<any>;
}

export const ProtectedRoute: React.FC<OwnProps> = props => {
    const { component, ...rest } = props;
  
    const dispatch = useDispatch();
    
    const reduxJwt = useSelector<Store, string>(store => store.loginReducer.token);
    const localJwt = localStorage.getItem('token');

    const token = reduxJwt ? reduxJwt : (localJwt ? localJwt : '');
    console.log('token: ', token)
    const decod: DecodedToken = jwt_decode(token)
    const decodedToken = token && decod;
    let validToken: boolean = false;

    if (decodedToken) {
        console.log('decoded token : ', decodedToken.exp)
        if (decodedToken.exp > (Math.floor(new Date().getTime() / 1000))) {
            console.log('login sucess')
            dispatch(loginSuccess({ token }));
            localStorage.setItem('token', token);
            axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + token;
    
            validToken = true;
        } else {
            console.log('logout success')
            localStorage.removeItem('token');
            axiosInstance.defaults.headers.common.Authorization = '';
            dispatch(clearStoreLogout());
        }
    }

  
    const Component = component;
  
    const renderFn = (routerProps: any) => {
        return validToken ? (
            <Component {...routerProps} />
        ) : (
            <Redirect
                to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}
            />
        );
    };
  
    return <Route {...rest} render={renderFn} />;
};

export default ProtectedRoute;

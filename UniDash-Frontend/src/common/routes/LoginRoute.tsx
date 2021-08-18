import * as React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { Store } from '../../modules/root-reducer';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../../@types';

interface OwnProps extends RouteProps {
  component: React.ComponentType<any>;
}

export const LoginRoute: React.FC<OwnProps> = props => {
    const { component, ...rest } = props;
  
    const reduxJwt = useSelector<Store, string>(store => store.loginReducer.token);
    const localJwt = localStorage.getItem('token');

    const token = reduxJwt ? reduxJwt : (localJwt ? localJwt : '');
    const decodedToken: any = token && jwt_decode(token);
    let validToken: boolean = true;

    if (decodedToken) {
        if (decodedToken.exp > (Math.floor(new Date().getTime() / 1000))) {
            validToken = false;
        } 
    }
  
    const Component = component;
  
    const renderFn = (routerProps: any) => {
        return validToken ? (
            <Component {...routerProps} />
        ) : (
            <Redirect
                to={{
                    pathname: '/Students',
                    state: { from: props.location }
                }}
            />
        );
    };
  
    return <Route {...rest} render={renderFn} />;
};

export default LoginRoute;

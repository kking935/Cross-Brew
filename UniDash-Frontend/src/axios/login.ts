import { LoginRequest, LoginResponse } from './../@types/index.d';
import axiosInstance from './axios-instance';
import { handleError } from './utils';

/**
 * Logins in a user
 */
export const loginUser = (loginRequest: LoginRequest) =>
    axiosInstance.post<LoginResponse>(
        '/user/authenticate/', loginRequest
    ).catch(handleError);

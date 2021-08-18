import axiosInstance from './axios-instance';
import store from '../store';
import { clearStoreLogout } from '../modules/login-reducer';

const setupAxiosInterceptors = () => {
    axiosInstance.interceptors.response.use(
        res => {
            return res;
        },
        error => {
            // logic for global error handling here!
            if (error.response) {
                // Token expired
                if (error.response.status === 401) {
                    localStorage.removeItem('token');
                    axiosInstance.defaults.headers.common.Authorization = '';
                    store.dispatch(clearStoreLogout()); // import store from src/store.ts
                }
            }      
            throw error;
        }
    );
};

export default setupAxiosInterceptors;

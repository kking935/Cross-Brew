import axios, { AxiosInstance } from 'axios';

/* eslint-disable-next-line no-undef*/
const serverIpAddress: string = process.env.REACT_APP_BACKEND_URL
    ? 'https://' + process.env.REACT_APP_BACKEND_URL
    : 'http://localhost:3030';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: serverIpAddress
});

export default axiosInstance;
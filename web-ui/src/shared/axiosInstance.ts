import { _devAuthHeaders } from '@vtb-ermo/authorization';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { endpoint } from '~/constants/hostConfig';

export const axiosInstance = axios.create({
    baseURL: endpoint,
    headers: {
        Accept: 'application/json, text/plain',
    },
});

axiosInstance.interceptors.request.use((request) => {
    Object.assign(request.headers, _devAuthHeaders);
    return request;
});

export const errInterceptor = (err: AxiosError<AxiosResponse>, cb: () => void): Promise<never> => {
    if (err.response?.status === 401) cb();
    return Promise.reject(err);
};

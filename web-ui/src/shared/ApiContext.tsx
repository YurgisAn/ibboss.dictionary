/**
 * Контекст API
 */
import React, { createContext, FC, useContext } from 'react';

import { apiInstance } from '~/shared/apiInstance';

import { ApiService } from './ApiService';

export const ApiContext = createContext<ApiService>(apiInstance);

export const ApiProvider: FC<{ value?: ApiService }> = ({ value, children }) => {
    return <ApiContext.Provider value={value ?? apiInstance}>{children}</ApiContext.Provider>;
};

export const useApi = (): ApiService => {
    const ctx = useContext(ApiContext);

    if (!ctx) throw new Error('Не найден контекст. Проверьте <ApiContext.Provider/> на реализацию');

    return ctx;
};

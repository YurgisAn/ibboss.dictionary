/**
 * Набор API
 */
import { AxiosInstance } from 'axios';

import { hostConfig } from '~/constants/hostConfig';

import {
    Configuration
} from './common/configuration';

import {
    BicApi,
    SourceBookApi,
} from './api'

export type ApiService = {
    sourceBookApi: SourceBookApi;
    bicApi: BicApi;
};

export function initApi(axios: AxiosInstance, basePath: string): ApiService {
    const configuration = new Configuration({
        basePath,
    });

    return {
        sourceBookApi: new SourceBookApi(configuration, basePath, axios),
        bicApi: new BicApi(configuration, basePath, axios)
    };
}

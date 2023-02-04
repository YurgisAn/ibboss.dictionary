/**
 * Набор API
 */
import { AxiosInstance } from 'axios';

import { hostConfig } from '~/constants/hostConfig';

import {
    Configuration
} from './common/configuration';

import {
    HolidayCountryApi,   // by YuryAn
    HolidayCurrencyApi,  // by Yury An
    BicApi,
    SourceBookApi,
} from './api'

export type ApiService = {
    sourceBookApi: SourceBookApi;
    holidayCountryApi: HolidayCountryApi;   // by YuryAn
    holidayCurrencyApi: HolidayCurrencyApi;  // by YuryAn
    bicApi: BicApi;
};

export function initApi(axios: AxiosInstance, basePath: string): ApiService {
    const configuration = new Configuration({
        basePath,
    });

    return {
        sourceBookApi: new SourceBookApi(configuration, basePath, axios),
        holidayCountryApi: new HolidayCountryApi(configuration, basePath, axios),   // by YuryAn
        holidayCurrencyApi: new HolidayCurrencyApi(configuration, basePath, axios),  // by YuryAn
        bicApi: new BicApi(configuration, basePath, axios)
    };
}

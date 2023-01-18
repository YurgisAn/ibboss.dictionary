/**
 * Api для работы со справочником БИКов
 */
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../common/configuration';
// @ts-ignore
import { DUMMY_BASE_URL, setSearchParams, toPathString, createRequestFunction, serializeDataIfNeeded } from '../common/common';
// @ts-ignore
import { BASE_PATH, RequestArgs, BaseAPI } from '../common/base';

import { BicRequest } from '../models'

//#region axios parameter creator
/**
 * BicApi 
 * @export
 */
export const BicApiAxiosParamCreator = function (configuration?: Configuration) {
    return {

        /** 
         * @summary Сохранение данных 
         * @param {BicRequest} bic данные            
         * @deprecated
         * @throws {RequiredError}
         */
        story: async (bic: BicRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/bic/story`;
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';           
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(bic, localVarRequestOptions, configuration)
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }
    }
}
//#endregion factory interface

//#region functional programming interface
/**
 * BicApiFp
 * @export
 */
export const BicApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = BicApiAxiosParamCreator(configuration)
    return {
        /**
         * @summary Сохранение данных 
         * @param {BicRequest} bic данные      
         * @deprecated
         * @throws {RequiredError}
         */
        async story(bic: BicRequest, options: AxiosRequestConfig = {}):
                Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.story(bic, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        }
    }
};
//#endregion functional programming interface

//#region factory interface
/**
 * BicApi
 * @export
 */
export const BicApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = BicApiFp(configuration)
    return {
        /**
         * @summary Сохранение данных 
         * @param {BicRequest} bic данные             
         * @deprecated
         * @throws {RequiredError}
         */
        story(bic: BicRequest, options?: any): AxiosPromise<string> {
            return localVarFp.story(bic, options).then((request) => request(axios, basePath));
        } 
            
    };
};
//#endregion factory interface

//#region Request interface

//#endregion Request interface

//#region object-oriented interface
/**
 * BicApi
 * @export
 * @class BicApi
 * @extends {BaseAPI}
 */
export class BicApi extends BaseAPI { 
    /**
     * Возвращает данные для списка
     * @summary Данные
     * @param {BicApiGetBookRowsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     * @memberof BicApi
     */
    public story(requestParameters: BicRequest, options?: AxiosRequestConfig) {
        return BicApiFp(this.configuration).story(requestParameters,
                                            options).then((request) => request(this.axios, this.basePath));
    }            
}
//#endregion object-oriented interface
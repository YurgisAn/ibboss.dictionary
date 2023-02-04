/**
 * Api для работы со справочником выходных/праздничных днях по странам
 */
 import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
 import { Configuration } from '../common/configuration';
 // @ts-ignore
 import { DUMMY_BASE_URL, setSearchParams, toPathString, createRequestFunction, serializeDataIfNeeded } from '../common/common';
 // @ts-ignore
 import { BASE_PATH, RequestArgs, BaseAPI } from '../common/base';
 
 import { HolidayCountryRequest } from '../models/holidayCountry-request';
 
 //#region axios parameter creator
 /**
  * HolidayCountryApi 
  * @export
  */
 export const HolidayCountryApiAxiosParamCreator = function (configuration?: Configuration) {
     return {
 
         /** 
          * @summary Сохранение данных 
          * @param {HolidayCountryRequest} holiday_country данные            
          * @deprecated
          * @throws {RequiredError}
          */
         story: async (holiday_country: HolidayCountryRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
             const localVarPath = `/sourcebooks/add/holiday_country`;
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
             localVarRequestOptions.data = serializeDataIfNeeded(holiday_country, localVarRequestOptions, configuration)
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
  * HolidayCountryApiFp
  * @export
  */
 export const HolidayCountryApiFp = function(configuration?: Configuration) {
     const localVarAxiosParamCreator = HolidayCountryApiAxiosParamCreator(configuration)
     return {
         /**
          * @summary Сохранение данных 
          * @param {HolidayCountryRequest} holiday_country данные      
          * @deprecated
          * @throws {RequiredError}
          */
         async story(holiday_country: HolidayCountryRequest, options: AxiosRequestConfig = {}):
                 Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
             const localVarAxiosArgs = await localVarAxiosParamCreator.story(holiday_country, options);
             return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
         }
     }
 };
 //#endregion functional programming interface
 
 //#region factory interface
 /**
  * HolidayCountryApi
  * @export
  */
 export const HolidayCountryApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
     const localVarFp = HolidayCountryApiFp(configuration)
     return {
         /**
          * @summary Сохранение данных 
          * @param {HolidayCountryRequest} holiday_country данные             
          * @deprecated
          * @throws {RequiredError}
          */
         story(holiday_country: HolidayCountryRequest, options?: any): AxiosPromise<string> {
             return localVarFp.story(holiday_country, options).then((request) => request(axios, basePath));
         } 
             
     };
 };
 //#endregion factory interface
 
 //#region Request interface
 
 //#endregion Request interface
 
 //#region object-oriented interface
 /**
  * HolidayCountryApi
  * @export
  * @class HolidayCountryApi
  * @extends {BaseAPI}
  */
 export class HolidayCountryApi extends BaseAPI { 
     /**
      * Возвращает данные для списка
      * @summary Данные
      * @param {HolidayCountryApiGetBookRowsRequest} requestParameters Request parameters.
      * @param {*} [options] Override http request option.
      * @deprecated
      * @throws {RequiredError}
      * @memberof HolidayCountryApi
      */
     public story(requestParameters: HolidayCountryRequest, options?: AxiosRequestConfig) {
         return HolidayCountryApiFp(this.configuration).story(requestParameters,
                                             options).then((request) => request(this.axios, this.basePath));
     }            
 }
 //#endregion object-oriented interface
/**
 * Api для работы со справочником выходных/праздничных днях по валютам
 */
 import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
 import { Configuration } from '../common/configuration';
 // @ts-ignore
 import { DUMMY_BASE_URL, setSearchParams, toPathString, createRequestFunction, serializeDataIfNeeded } from '../common/common';
 // @ts-ignore
 import { BASE_PATH, RequestArgs, BaseAPI } from '../common/base';
 
 import { HolidayCurrencyRequest } from '../models/holidayCurrency-request'
 
 //#region axios parameter creator
 /**
  * HolidayCurrencyApi 
  * @export
  */
 export const HolidayCurrencyApiAxiosParamCreator = function (configuration?: Configuration) {
     return {
 
         /** 
          * @summary Сохранение данных 
          * @param {HolidayCurrencyRequest} holiday_currency данные            
          * @deprecated
          * @throws {RequiredError}
          */
         story: async (holiday_currency: HolidayCurrencyRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
             const localVarPath = `/sourcebooks/add/holiday_currency`;
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
             localVarRequestOptions.data = serializeDataIfNeeded(holiday_currency, localVarRequestOptions, configuration)
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
  * HolidayCurrencyApiFp
  * @export
  */
 export const HolidayCurrencyApiFp = function(configuration?: Configuration) {
     const localVarAxiosParamCreator = HolidayCurrencyApiAxiosParamCreator(configuration)
     return {
         /**
          * @summary Сохранение данных 
          * @param {HolidayCurrencyRequest} holiday_currency данные      
          * @deprecated
          * @throws {RequiredError}
          */
         async story(holiday_currency: HolidayCurrencyRequest, options: AxiosRequestConfig = {}):
                 Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
             const localVarAxiosArgs = await localVarAxiosParamCreator.story(holiday_currency, options);
             return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
         }
     }
 };
 //#endregion functional programming interface
 
 //#region factory interface
 /**
  * HolidayCurrencyApi
  * @export
  */
 export const HolidayCurrencyApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
     const localVarFp = HolidayCurrencyApiFp(configuration)
     return {
         /**
          * @summary Сохранение данных 
          * @param {HolidayCurrencyRequest} holiday_currency данные             
          * @deprecated
          * @throws {RequiredError}
          */
         story(holiday_currency: HolidayCurrencyRequest, options?: any): AxiosPromise<string> {
             return localVarFp.story(holiday_currency, options).then((request) => request(axios, basePath));
         } 
             
     };
 };
 //#endregion factory interface
 
 //#region Request interface
 
 //#endregion Request interface
 
 //#region object-oriented interface
 /**
  * HolidayCurrencyApi
  * @export
  * @class HolidayCurrencyApi
  * @extends {BaseAPI}
  */
 export class HolidayCurrencyApi extends BaseAPI { 
     /**
      * Возвращает данные для списка
      * @summary Данные
      * @param {HolidayCurrencyApiGetBookRowsRequest} requestParameters Request parameters.
      * @param {*} [options] Override http request option.
      * @deprecated
      * @throws {RequiredError}
      * @memberof HolidayCurrencyApi
      */
     public story(requestParameters: HolidayCurrencyRequest, options?: AxiosRequestConfig) {
         return HolidayCurrencyApiFp(this.configuration).story(requestParameters,
                                             options).then((request) => request(this.axios, this.basePath));
     }            
 }
 //#endregion object-oriented interface
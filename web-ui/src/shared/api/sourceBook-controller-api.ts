/**
 * Api для работы со справочниками
 */
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../common/configuration';
// @ts-ignore
import { DUMMY_BASE_URL, setSearchParams, toPathString, createRequestFunction, serializeDataIfNeeded } from '../common/common';
// @ts-ignore
import { BASE_PATH, RequestArgs, BaseAPI } from '../common/base';

import { DirectoryDto, SourceBookDto, DataDto, QueryRequest, ListValueDto } from '../models'

//#region axios parameter creator
/**
 * SourceBookApi 
 * @export
 */
export const SourceBookApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Возвращает список справочников
         * @deprecated
         * @throws {RequiredError}
         */
        getDirectories: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sourcebooks/directory`;

            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },

        /**
         * Возвращает метаданные справочника
         * @summary Метаданные справочника
         * @param {string} name наименование
         * @deprecated
         * @throws {RequiredError}
         */
        getSourceBooks: async (name:string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sourcebooks/{name}`.replace(`{${"name"}}`, encodeURIComponent(String(name)));
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },

        /**
         * Возвращает строки справочника
         * @summary Данные справочника
         * @param {string} name наименование
         * @param {number} take кол-во
         * @param {number} skip страница
         * @param {string} sortColumn сортировка
         * @param {boolean} asc сортировка
         * @param {QueryRequest} filter фильтрация          
         * @deprecated
         * @throws {RequiredError}
         */
        getBookRows: async (name:string, take: number, skip:number, sortColumn:string, asc:boolean, filter?: QueryRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sourcebooks/data/{name}/{take}/{skip}/{sortColumn}/{asc}`
                                .replace(`{${"name"}}`, encodeURIComponent(String(name)))
                                .replace(`{${"take"}}`, encodeURIComponent(String(take)))
                                .replace(`{${"skip"}}`, encodeURIComponent(String(skip - 1)))
                                .replace(`{${"sortColumn"}}`, encodeURIComponent(String(sortColumn)))
                                .replace(`{${"asc"}}`, encodeURIComponent(String(asc)));
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';           
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(filter, localVarRequestOptions, configuration)
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },

        /**
         * Возвращает кол-во строк
         * @summary Данные справочника
         * @param {string} name наименование
         * @param {QueryRequest} filter фильтрация             
         * @deprecated
         * @throws {RequiredError}
         */
        getBookCountRows: async (name:string, filter?: QueryRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sourcebooks/count/{name}`
                                .replace(`{${"name"}}`, encodeURIComponent(String(name)));
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';           
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(filter, localVarRequestOptions, configuration)
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Возвращает данные для списка
         * @summary Данные из списка
         * @param {string} name наименование
         * @param {string} listName наименование списка             
         * @deprecated
         * @throws {RequiredError}
         */
        getBookListItems: async (name:string, listName: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/sourcebooks/list/{name}/{listName}`
                                .replace(`{${"name"}}`, encodeURIComponent(String(name)))
                                .replace(`{${"listName"}}`, encodeURIComponent(String(listName)));
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';           
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

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
 * SourceBookApiFp
 * @export
 */
export const SourceBookApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = SourceBookApiAxiosParamCreator(configuration)
    return {
        /**
         * Возвращает список справочников
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        async getDirectories(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DirectoryDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getDirectories(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },

        /**
         * Возвращает метаданные справочника
         * @summary Метаданные справочника
         * @param {string} name наименование
         * @deprecated
         * @throws {RequiredError}
         */
        async getSourceBooks(name:string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SourceBookDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getSourceBooks(name, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        } ,
        
         /**
         * Возвращает строки справочника
         * @summary Данные справочника
         * @param {string} name наименование
         * @param {number} take кол-во
         * @param {number} skip страница
         * @param {string} sortColumn сортировка
         * @param {boolean} asc наименование         
         * @deprecated
         * @throws {RequiredError}
         */
        async getBookRows(name:string, take: number, skip:number, sortColumn:string, asc:boolean, filter?: QueryRequest,  options: AxiosRequestConfig = {}):
                         Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<DataDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getBookRows(name, take, skip, sortColumn, asc, filter, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        
        
        /**
         * Возвращает кол-во строк
         * @summary Количество строк
         * @param {string} name наименование
         * @param {QueryRequest} filter фильтрация             
         * @deprecated
         * @throws {RequiredError}
         */
        async getBookCountRows(name:string, filter?: QueryRequest,  options: AxiosRequestConfig = {}):
                                     Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<number>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getBookCountRows(name, filter, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },

        /**
         * Возвращает данные для списка
         * @summary Данные из списка
         * @param {string} name наименование
         * @param {string} listName наименование списка             
         * @deprecated
         * @throws {RequiredError}
         */
        async getBookListItems(name:string, listName: string,  options: AxiosRequestConfig = {}):
                Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ListValueDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getBookListItems(name, listName, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        }
    }
};
//#endregion functional programming interface

//#region factory interface
/**
 * SourceBookApi
 * @export
 */
export const SourceBookApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = SourceBookApiFp(configuration)
    return {
        /**
         * Возвращает список справочников
         * @summary Справочники
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        getDirectories(options?: any): AxiosPromise<DirectoryDto> {
            return localVarFp.getDirectories(options).then((request) => request(axios, basePath));
        },

        /**
         * Возвращает метаданные справочника
         * @summary Метаданные справочника
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        getSourceBooks(name:string,options?: any): AxiosPromise<SourceBookDto> {
            return localVarFp.getSourceBooks(name,options).then((request) => request(axios, basePath));
        },

        /**
         * Возвращает строки справочника
         * @summary Данные справочника
         * @param {string} name наименование
         * @param {number} take кол-во
         * @param {number} skip страница
         * @param {string} sortColumn сортировка
         * @param {boolean} asc наименование         
         * @deprecated
         * @throws {RequiredError}
         */
        getBookRows(name:string, take: number, skip:number, sortColumn:string, asc:boolean, filter?: QueryRequest, options?: any): AxiosPromise<Array<DataDto>> {
            return localVarFp.getBookRows(name, take, skip, sortColumn, asc, filter, options).then((request) => request(axios, basePath));
        } ,

        /**
         * Возвращает кол-во строк
         * @summary Данные справочника
         * @param {string} name наименование
         * @param {QueryRequest} filter фильтрация             
         * @deprecated
         * @throws {RequiredError}
         */
         getBookCountRows(name:string, filter?: QueryRequest, options?: any): AxiosPromise<number> {
            return localVarFp.getBookCountRows(name, filter, options).then((request) => request(axios, basePath));
        } ,

        /**
         * Возвращает данные для списка
         * @summary Данные из списка
         * @param {string} name наименование
         * @param {string} listName наименование списка             
         * @deprecated
         * @throws {RequiredError}
         */
        getBookListItems(name:string, listName: string, options?: any): AxiosPromise<Array<ListValueDto>> {
            return localVarFp.getBookListItems(name, listName, options).then((request) => request(axios, basePath));
        } 
            
    };
};
//#endregion factory interface

//#region Request interface
/**
 * @export
 * @interface SourceBookApiGetSourceBooksRequest
 */
export interface SourceBookApiGetSourceBooksRequest {
    /**
     * наименование справочника
     * @type {string}
     * @memberof SourceBookApiGetSourceBooksRequest
     */
    readonly name: string
}

/**
 * @export
 * @interface SourceBookApiGetBookRowsRequest
 */
export interface SourceBookApiGetBookRowsRequest {
    /**
     * наименование справочника
     * @type {string}
     * @memberof SourceBookApiGetBookRowsRequest
    */
    readonly name: string  
    /**
     * Кол-во
     * @type {number}
     * @memberof SourceBookApiGetBookRowsRequest
    */
    readonly take: number

    /**
     * С какой страницы
     * @type {number}
     * @memberof SourceBookApiGetBookRowsRequest
    */
    readonly skip: number

    /**
     * сортировка
     * @type {string}
     * @memberof SourceBookApiGetBookRowsRequest
    */
    readonly sortColumn : string

    /**
     * Тип сортировки ASC/DESC
     * @type {boolean}
     * @memberof SourceBookApiGetBookRowsRequest
    */
    readonly asc  : boolean

    /**
     * Фильтр
     * @type {QueryRequest}
     * @memberof SourceBookApiGetBookRowsRequest
    */
    readonly filter?: QueryRequest
}

/**
 * @export
 * @interface SourceBookApiGetBookRowsCountRequest
 */
export interface SourceBookApiGetBookCountRowsRequest {
    /**
     * наименование справочника
     * @type {string}
     * @memberof SourceBookApiGetBookRowsCountRequest
    */
    readonly name: string  

    /**
     * Фильтр
     * @type {QueryRequest}
     * @memberof SourceBookApiGetBookRowsCountRequest
    */
    readonly filter?: QueryRequest
}


/**
 * @export
 * @interface SourceBookApiGetBookRowsCountRequest
 */
export interface SourceBookApiGetBookListItemRequest {
    /**
     * наименование справочника
     * @type {string}
     * @memberof SourceBookApiGetBookListItemRequest
    */
    readonly name: string  

    /**
     * Наименование списка
     * @type {string}
     * @memberof SourceBookApiGetBookListItemRequest
    */
    readonly listName: string
}


//#endregion Request interface

//#region object-oriented interface
/**
 * SourceBookApi
 * @export
 * @class SourceBookApi
 * @extends {BaseAPI}
 */
export class SourceBookApi extends BaseAPI {
    /**
     * Возвращает список справочников
     * @summary Справочники
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     * @memberof SourceBookApi
     */
    public getDirectories(options?: AxiosRequestConfig) {
        return SourceBookApiFp(this.configuration).getDirectories(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Возвращает справочник
     * @summary Метаданные по справочникам
     * @param {SourceBookApiGetSourceBooksRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     * @memberof SourceBookApi
     */
    public getSourceBooks(requestParameters: SourceBookApiGetSourceBooksRequest, options?: AxiosRequestConfig) {
        return SourceBookApiFp(this.configuration).getSourceBooks(requestParameters.name, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Возвращает кол-во строк
     * @summary Данные справочника
     * @param {string} name наименование
     * @param {QueryRequest} filter фильтрация             
     * @deprecated
     * @throws {RequiredError}
     */
    public getBookCountRows(requestParameters: SourceBookApiGetBookCountRowsRequest, options?: AxiosRequestConfig) {
        return SourceBookApiFp(this.configuration).getBookCountRows(requestParameters.name
                                                                    , requestParameters.filter
                                                                    , options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Возвращает строки справочника
     * @summary Данные
     * @param {SourceBookApiGetBookRowsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     * @memberof SourceBookApi
     */
    public getBookRows(requestParameters: SourceBookApiGetBookRowsRequest, options?: AxiosRequestConfig) {
        return SourceBookApiFp(this.configuration).getBookRows(requestParameters.name, requestParameters.take, requestParameters.skip, requestParameters.sortColumn
                                                            , requestParameters.asc
                                                            , requestParameters.filter
                                                            , options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Возвращает данные для списка
     * @summary Данные
     * @param {SourceBookApiGetBookRowsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     * @memberof SourceBookApi
     */
    public getBookListItems(requestParameters: SourceBookApiGetBookListItemRequest, options?: AxiosRequestConfig) {
        return SourceBookApiFp(this.configuration).getBookListItems(requestParameters.name,
                                                                    requestParameters.listName,
                                                                    options).then((request) => request(this.axios, this.basePath));
    }            
}
//#endregion object-oriented interface
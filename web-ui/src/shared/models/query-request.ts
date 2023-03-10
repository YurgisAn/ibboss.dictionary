/**
 * Запросы
 * @export
 * @interface QueryRequest
 */
export interface QueryRequest {
    /**
     * Тип запроса
     * @type {string}
     * @memberof QueryRequest
     */
    '$type'?: string;

    /**
     * 
     * @type {string}
     * @memberof QueryRequest
     */
    'node'?: QueryRequest;

    /**
     * Нижний диапазон
     * @type {string}
     * @memberof QueryRequest
     */    
    'lower'?: QueryRequest;
    
    /**
     * Верхний диапазон
     * @type {string}
     * @memberof QueryRequest
     */
    'upper'?: QueryRequest;

    /**
     * Тип данных
     * @type {string}
     * @memberof QueryRequest
     */
    'type'?: string;

    /**
     * Оператор
     * @type {string}
     * @memberof QueryRequest
    */
    'operator'?: string;


    /**
     * Наименование
     * @type {string}
     * @memberof QueryRequest
    */
    'name'?: string;

    /**
     * Значение
     * @type {string}
     * @memberof QueryRequest
    */
    'value'?: any;

    /**
     * запрос слева
     * @type {QueryRequest}
     * @memberof QueryRequest
     */
    'left'?: QueryRequest;

    /**
     * запрос с права
     * @type {QueryRequest}
     * @memberof QueryRequest
     */
    'right'?: QueryRequest;
    
}


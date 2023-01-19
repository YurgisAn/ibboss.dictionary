/**
 * Иформация о столбцах
 * @export
 * @interface СolumnInfoDto
 */
export interface СolumnInfoDto {
    /**
     * Наименование
     * @type {string}
     * @memberof СolumnInfoDto
     */
    'title': string;

    /**
     * Значение
     * @type {string}
     * @memberof СolumnInfoDto
     */
    'value': string;

    /**
     * Сортировка
     * @type {string}
     * @memberof СolumnInfoDto
     */
    'sortBy': string;
    
    /**
     * Фильтр
     * @type {boolean}
     * @memberof СolumnInfoDto
     */
    'filter': boolean;   

    /**
     * Хинт
     * @type {string}
     * @memberof СolumnInfoDto
    */
    'hints'?: string;
}


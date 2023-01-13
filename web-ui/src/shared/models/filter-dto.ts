/**
 * Информация о фильтрах
 * @export
 * @interface FilterDto
 */
export interface FilterDto {
    /**
     * Поле
     * @type {string}
     * @memberof FilterDto
     */
    'field': string;

    /**
     * Наименование
     * @type {string}
     * @memberof FilterDto
     */
    'title': string;

    /**
     * Сортировка
     * @type {string}
     * @memberof FilterDto
     */
    'editor': string;
    
    /**
     * Наименование списка откуда тянем
     * @type {boolean}
     * @memberof FilterDto
     */
    'list': string;   

    /**
     * Хинт
     * @type {string}
     * @memberof FilterDto
    */
    'hints': string;
}


/**
 * Cправочник
 * @export
 * @interface DirectoryDto
 */
export interface DirectoryDto {
    /**
     * Наименование
     * @type {string}
     * @memberof DirectoryDto
     */
    'name': string;

    /**
     * Заголовок
     * @type {string}
     * @memberof DirectoryDto
     */
    'title': string;

    /**
     * Страница
     * @type {string}
     * @memberof DirectoryDto
     */
    'page': string;

    /**
     * Включено
     * @type {boolean}
     * @memberof DirectoryDto
     */
    'disabled': boolean;
}


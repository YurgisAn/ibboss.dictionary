import { СolumnInfoDto } from './columnInfo-dto';

/**
 *  Модели
 */

/**
 * Единый справочник
 * @export
 * @interface SourceBookDto
 */
export interface SourceBookDto {
    /**
     * Наименование
     * @type {string}
     * @memberof SourceBookDto
     */
    'name': string;

    /**
     * Заголовок
     * @type {string}
     * @memberof SourceBookDto
     */
    'title'?: string;

    /**
     * Столбцы
     * @type {string}
     * @memberof BicDto
     */
    'columns':  Array<СolumnInfoDto>;
}


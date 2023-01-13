import { СolumnInfoDto } from './columnInfo-dto';
import { FilterDto } from './filter-dto';

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
     * @memberof SourceBookDto
     */
    'columns':  Array<СolumnInfoDto>;

    /**
     * Столбцы
     * @type {string}
     * @memberof SourceBookDto
     */
    'filters':  Array<FilterDto>;
}


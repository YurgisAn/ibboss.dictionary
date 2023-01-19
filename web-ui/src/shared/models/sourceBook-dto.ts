import { СolumnInfoDto } from './columnInfo-dto';
import { FilterDto } from './filter-dto';
import { ListDto } from './list-dto';

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
     * @type { Array<СolumnInfoDto>}
     * @memberof SourceBookDto
     */
    'columns':  Array<СolumnInfoDto>;

    /**
     * Столбцы
     * @type {Array<FilterDto>}
     * @memberof SourceBookDto
     */
    'filters':  Array<FilterDto>;

     /**
     * Столбцы
     * @type {Array<ListDto>}
     * @memberof SourceBookDto
     */
     'lists':  Array<ListDto>;   
}


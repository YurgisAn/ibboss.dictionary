import { ListItemDto } from "./listItem-dto";
import { ListValueDto } from "./listValue-dto";

/**
 * Информация о фильтрах
 * @export
 * @interface ListDto
 */
export interface ListDto {
    /**
     * Поле
     * @type {string}
     * @memberof ListDto
     */
    'name': string;

    /**
     * Тип значения
     * @type {string}
     * @memberof ListDto
     */
    'valueType': string;

    /**
     * Данные
     * @type {string}
     * @memberof ListDto
     */
    'values': Array<ListItemDto>;
}


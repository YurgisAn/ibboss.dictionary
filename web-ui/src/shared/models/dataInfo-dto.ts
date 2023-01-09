import { ItemValueDto } from './itemValue-dto';

/**
 * Информация
 * @export
 * @interface DataDto
 */
export interface DataDto {
    /**
     * Данные
     * @type {Array<ItemValueDto}
     * @memberof DataDto
     */
    'items': Array<ItemValueDto>;
}


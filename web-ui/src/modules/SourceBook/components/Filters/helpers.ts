import { createQueryString, parseQueryString } from '~/helpers/stringHelpers';
import { QueryRequest } from '~/shared/models';

import { clearEmptyProperties } from './utils/clearEmptyProperties';

/**
 * Преобразовываем в фильтр в url
 */
export const filterFormValuesToUrl = (filterParams: any): string =>
    `?${createQueryString(clearEmptyProperties(filterParams))}`;

/**
 * Преобразовываем url в JSON
 */
export const urlToFilterFormValues = (url: string): any => {    
    const [, filterFormValuesStr] = url.split('?');
    if (filterFormValuesStr) 
        return parseQueryString(filterFormValuesStr);
    return {};
};


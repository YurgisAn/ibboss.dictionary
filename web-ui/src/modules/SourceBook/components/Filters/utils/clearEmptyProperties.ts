import { isEmpty, isNumber, isBoolean } from 'lodash';
import { emptyShortDatesRange } from '../constants';

export const clearEmptyProperties = (obj: { [key: string]: any }) => {
    const result: { [key: string]: any } = {};
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        //пустые диапахоны данных пропускаем
        if (value === emptyShortDatesRange) 
        {
            return;
        }
        if (!isEmpty(value) || (isNumber(value) && value) || isBoolean(value)) 
            result[key] = obj[key];
    });
    return result;
};

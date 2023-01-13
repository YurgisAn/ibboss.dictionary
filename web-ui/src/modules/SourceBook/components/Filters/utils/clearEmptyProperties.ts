import { isEmpty, isNumber, isBoolean } from 'lodash';

export const clearEmptyProperties = (obj: { [key: string]: any }) => {
    const result: { [key: string]: any } = {};
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (!isEmpty(value) || (isNumber(value) && value) || isBoolean(value)) result[key] = obj[key];
    });
    return result;
};

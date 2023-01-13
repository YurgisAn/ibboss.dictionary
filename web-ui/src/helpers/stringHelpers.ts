import { AnyObject } from '~/types/common';

export const stringToBoolean = (string: string | undefined): boolean => (string === 'false' ? false : !!string);

export function sortAlphabetByKey<T extends Record<keyof unknown, unknown>, K extends keyof T>(arr: T[], key: K) {
    return [...arr].sort((a, b) => {
        if (key in a && key in b) {
            const valueA = a[key];
            const valueB = b[key];
            if (typeof valueA === 'string' && typeof valueB === 'string') {
                return valueA.localeCompare(valueB);
            } else return 0;
        } else return 0;
    });
}

export const createQueryString = (values: AnyObject): string => encodeURI(JSON.stringify(values));
export const parseQueryString = (values: string): AnyObject => JSON.parse(decodeURI(values));

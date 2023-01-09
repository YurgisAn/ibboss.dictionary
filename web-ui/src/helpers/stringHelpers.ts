import qs from 'qs';

import { isNumericString } from '~/helpers/numberHerpers';
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

export const createQueryString = (values: AnyObject): string => qs.stringify(values);

export const parseQueryString = (values: string): AnyObject =>
    qs.parse(values, {
        decoder(str, decoder, charset) {
            console.log(str);
            if (isNumericString(str)) {
                return str;
            }

            const strWithoutPlus = str.replace(/\+/g, ' ');
            if (charset === 'iso-8859-1') {
                // unescape never throws, no try...catch needed:
                return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
            }

            if (/^(\d+|\d*\.\d+)$/.test(str)) {
                return parseFloat(str);
            }

            const keywords = {
                true: true,
                false: false,
                null: null,
                undefined,
            };
            
            if (str in keywords) {
                // @ts-expect-error Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ true: boolean; false: boolean; null: null; undefined: undefined; }'
                return keywords[str];
            }
          
            // utf-8
            try {
                return decodeURIComponent(strWithoutPlus);
            } catch (e) {
                return strWithoutPlus;
            }
        },
    });

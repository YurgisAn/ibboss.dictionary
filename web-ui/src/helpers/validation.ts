import { add, isAfter } from 'date-fns';
import * as yup from 'yup';

import {parseISODuration} from '~/helpers/parseISODuration';

const ISODurationSchema = yup.string().matches(
    /**
     * ISO8601 Duration RegExp
     * @link https://stackoverflow.com/a/53140944
     */
    /^P(?!$)((\d+Y)|(\d+\.\d+Y$))?((\d+M)|(\d+\.\d+M$))?((\d+W)|(\d+\.\d+W$))?((\d+D)|(\d+\.\d+D$))?(T(?=\d)((\d+H)|(\d+\.\d+H$))?((\d+M)|(\d+\.\d+M$))?(\d+(\.\d+)?S)?)??$/
);

export const ISODurationPositiveSchema = ISODurationSchema.test('should be positive value', (value): boolean => {
    if (!value) return true;

    const duration = parseISODuration(value);

    if (!duration) return false;

    const date = add(0, duration);

    return isAfter(date, 0);
});

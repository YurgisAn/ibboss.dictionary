/* eslint-disable import/no-duplicates */
import { isBefore } from 'date-fns';

import { ShortDateUtils } from '~/types/timeNominalTypes';

export const isShortDatesRangeValid = (dates: string, strict?: boolean): boolean => {
    const [start, end] = dates.split(' - ');
    const startDate = ShortDateUtils.tryParse(start);
    const endDate = ShortDateUtils.tryParse(end);
    return (
        !!startDate &&
        !!endDate &&
        ((!strict && startDate.getTime() === endDate.getTime()) || isBefore(startDate, endDate))
    );
};
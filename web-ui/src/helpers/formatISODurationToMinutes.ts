import { differenceInMinutes } from 'date-fns';

import { Minutes } from '~/types/timeNominalTypes';

import { parseISODuration } from './parseISODuration';

export const formatISODurationToMinutes = (duration: string | null | undefined): Minutes => {
    const parsedDuration = parseISODuration(duration);
    return parsedDuration
        ? differenceInMinutes(
              new Date(
                  parsedDuration.years || 0,
                  parsedDuration.months || 0,
                  parsedDuration.days || 0,
                  parsedDuration.hours || 0,
                  parsedDuration.minutes || 0,
                  parsedDuration.seconds || 0
              ),
              new Date(0, 0, 0, 0, 0, 0)
          )
        : NaN;
};

import { differenceInSeconds } from 'date-fns';

import { Seconds } from '~/types/timeNominalTypes';

import { parseISODuration } from './parseISODuration';

export const formatISODurationToSeconds = (duration: string | null | undefined): Seconds => {
    const parsedDuration = parseISODuration(duration);
    return parsedDuration
        ? differenceInSeconds(
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

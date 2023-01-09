import { differenceInSeconds } from 'date-fns';
import { useMemo } from 'react';

import { Seconds } from '~/types/timeNominalTypes';

type DurationHookResult = { isDanger: boolean; isWarning: boolean; currentDuration: Seconds };

export function useDuration(duration: Seconds, warningLimit: Seconds): DurationHookResult {
    const originalDurationReceivedAt = useMemo(
        () => new Date(),
        // actually want to sync with duration @SQReder
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [duration]
    );
    const timeFromLastOriginalDurationUpdate = differenceInSeconds(originalDurationReceivedAt, new Date());
    const currentDuration: Seconds = duration + timeFromLastOriginalDurationUpdate;

    const isDanger = currentDuration <= 0;
    const isWarning = !isDanger && currentDuration <= warningLimit;

    return {
        currentDuration,
        isWarning,
        isDanger,
    };
}

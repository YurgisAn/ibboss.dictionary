import { useEffect, useState } from 'react';

import { Seconds } from '~/types/timeNominalTypes';

const DEFAULT_REFRESH_INTERVAL: Seconds = 15;

export function useRefresh(disabled: boolean | undefined, timeout: Seconds = DEFAULT_REFRESH_INTERVAL): void {
    const [, forceUpdate] = useState({});

    useEffect(() => {
        if (disabled) return;

        const timer = setInterval(() => {
            forceUpdate({});
        }, timeout * 1000);

        return () => {
            clearInterval(timer);
        };
    }, [disabled, timeout]);
}

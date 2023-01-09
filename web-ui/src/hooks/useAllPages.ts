import { useCallback, useRef } from 'react';

export const useAllPages = () => {
    const countTotal = useRef(1);
    const item = useRef<any[]>([]);

    const fetchAllPages = useCallback(async (api, options, cb) => {
        try {
            const result = await api(options);

            const { paging, data } = result?.data;
            const { count, total } = paging;

            countTotal.current += count;
            item.current = [...item.current, ...data];

            if (item.current.length < total) {
                setTimeout(() => fetchAllPages(api, { ...options, pageOffset: countTotal.current }, cb), 100);
            } else {
                cb(item.current);

                item.current = [];
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    return { fetchAllPages };
};

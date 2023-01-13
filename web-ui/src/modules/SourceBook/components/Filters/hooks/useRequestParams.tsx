import { useLocation } from '@vtb-ermo/router';
import { useMemo } from 'react';

import { urlToFilterFormValues } from '~/modules/SourceBook/components/Filters/helpers';
import { QueryRequest } from '~/shared/models';
import { useCreateParams } from './useCreateParams';

export const formValuesToRequestParams = (): QueryRequest => {
    const location = useLocation();
    return useMemo(
        () => ({
            ...useCreateParams(urlToFilterFormValues(location.search))
        }),
        [location.search]
    );
};

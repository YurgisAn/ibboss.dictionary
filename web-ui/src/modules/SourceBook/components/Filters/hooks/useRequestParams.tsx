import { useLocation } from '@vtb-ermo/router';
import { useMemo } from 'react';

import { urlToFilterFormValues } from '~/modules/SourceBook/components/Filters/helpers';
import { FilterDto, QueryRequest } from '~/shared/models';
import { useCreateParams } from './useCreateParams';

export const formValuesToRequestParams = (list:Array<FilterDto>): QueryRequest => {
    const location = useLocation();
    return useMemo(() => ({
                            ...useCreateParams(urlToFilterFormValues(location.search), list)
                            }
                        ),
        [location.search, list]
    );
};

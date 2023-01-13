/**
 * Панель фильтрации
 */
import { useHistory, useLocation } from '@vtb-ermo/router';
import { useFormik } from 'formik';
import isEqual from 'lodash/isEqual';
import React, { useCallback, useEffect, useState, FC } from 'react';

import { assertDefined } from '~/helpers/guards';
import { useApi } from '~/shared/ApiContext';
import { FilterDto } from '~/shared/models/filter-dto';

import { useSourcebookContext } from '../../SourceBookContext';
import { BaseFilters } from './BaseFilters/BaseFilters';
import { ExtendedFilters } from './ExtendedFilters';
import { filterFormValuesToUrl, urlToFilterFormValues } from './helpers';
import { validationSchema } from './validation';

type Props = {
    filters: Array<FilterDto>;
};

export const Filters: FC<Props> = ({ filters }) => {
    const history = useHistory();
    const location = useLocation();
    const initialFilterValues = {  };
    const [isExtendedFiltersOpened, setExtendedFiltersOpened] = useState(false);

    const { forceUpdate } = useSourcebookContext();

    /**
     * Применение фильтра
     */
    const handleOnSubmit = useCallback(
        (values) => {
            setExtendedFiltersOpened(false);
            //Проверяем чтобы параметры из url совпадали с фильтром
            if (isEqual(values, urlToFilterFormValues(location.search))) 
                forceUpdate({});
            else 
                history.push({ search: filterFormValuesToUrl(values) });
        },
        [forceUpdate, history, location.search]
    );

    const formik = useFormik({
        validateOnChange: false,
        initialValues: initialFilterValues,
        validationSchema: validationSchema,
        onSubmit: handleOnSubmit,
    });
    const { setValues } = formik;

    const handleOnCancel = useCallback(() => {
        setValues(urlToFilterFormValues(location.search));
        setExtendedFiltersOpened(false);
    }, [location.search, setValues]);

    return (
        <>
             <BaseFilters
                formik={formik}
                onExtendedFiltersOpen={() => setExtendedFiltersOpened(true)}
                filters={filters}
            />       
            <ExtendedFilters
                onCancel={handleOnCancel}
                isOpen={isExtendedFiltersOpened}
                formik={formik}
                onClose={() => setExtendedFiltersOpened(false)}
            />
        </>
    );
};

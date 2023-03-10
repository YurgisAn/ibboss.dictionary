/**
 * Панель фильтрации
 */
import { useHistory, useLocation } from '@vtb-ermo/router';
import { useFormik } from 'formik';
import isEqual from 'lodash/isEqual';
import React, { useCallback, useEffect, useState, FC } from 'react';

import { assertDefined } from '~/helpers/guards';
import { useApi } from '~/shared/ApiContext';
import { ListDto } from '~/shared/models';
import { FilterDto } from '~/shared/models/filter-dto';

import { useSourcebookContext } from '../../SourceBookContext';
import { BaseFilters } from './BaseFilters/BaseFilters';
import { ExtendedFilters } from './ExtendedFilters';
import { filterFormValuesToUrl, urlToFilterFormValues } from './helpers';
import { validationSchema } from './validation';

type Props = {
    book:string;
    filters: Array<FilterDto>;
    lists: Array<ListDto>;
    totalCount:number;
};

export const Filters: FC<Props> = ({book, filters, lists, totalCount }) => {
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
                book={book}
                formik={formik}
                onExtendedFiltersOpen={() => setExtendedFiltersOpened(true)}
                filters={filters}
                lists={lists}
                totalCount ={totalCount}
            />       
            <ExtendedFilters
                book={book}
                filters={filters}
                lists={lists}
                onCancel={handleOnCancel}
                isOpen={isExtendedFiltersOpened}
                formik={formik}
                onClose={() => setExtendedFiltersOpened(false)}
            />
        </>
    );
};

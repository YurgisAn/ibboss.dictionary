/**
 * Список с поиском
 */
import { Option, SearchSelectField } from '@vtb/ui-kit3';
import { SearchSelectFieldProps } from '@vtb/ui-kit3/dist/components/form/SearchSelectField';
import React, { FC, useCallback } from 'react';
import { ListDto } from '~/shared/models';

import { AnyObject } from '~/types/common';

import { FilterFormProps } from '../../types';

type Props = {
    formik: FilterFormProps;
    field: string;
    value:any;
    fieldProps: SearchSelectFieldProps;
    list?: ListDto;
    submitFormTrigger?: (v: AnyObject) => void;
};

export const FilterSearchSelect: FC<Props> = ({formik, value, field, fieldProps, list, submitFormTrigger }) => {
    const { setFieldValue } = formik;

    const handleChange = useCallback(
        (e) => {
            setFieldValue(field, e.currentTarget.value);
            submitFormTrigger?.({});
        },
        [setFieldValue, submitFormTrigger]
    );

    return <SearchSelectField name={field} value={value} {...fieldProps} onChange={handleChange}>                
                 {list?.values?.map((item) =>
                        <Option                                
                                value={item.value}>{item.text}
                        </Option>)}
           </SearchSelectField>;
};

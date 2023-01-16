/**
 * Список с поиском
 */
import { Option, SearchSelectField } from '@vtb/ui-kit3';
import { SearchSelectFieldProps } from '@vtb/ui-kit3/dist/components/form/SearchSelectField';
import React, { FC, useCallback } from 'react';
import { ListItemDto } from '~/shared/models';

import { AnyObject } from '~/types/common';

import { FilterFormProps } from '../../types';

type Props = {
    formik: FilterFormProps;
    field: string;
    value:any;
    fieldProps: SearchSelectFieldProps;
    list?: Array<ListItemDto>;
    type?:string;
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
                 {list?.map((item) =>
                    <Option key={item.value}                              
                            value={item.value}>{item.text}
                    </Option>)}
           </SearchSelectField>;
};

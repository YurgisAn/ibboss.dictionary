import { DateField } from '@vtb/ui-kit3';
import { DateFieldProps } from '@vtb/ui-kit3/dist/components/form/DateField';
import React, { FC, useCallback } from 'react';

import { AnyObject } from '~/types/common';

import { FilterFormProps } from '../../types';

type Props = {
    value:any;
    formik: FilterFormProps;
    field: string;
    dateFieldProps: DateFieldProps;
    submitFormTrigger?: (v: AnyObject) => void;
};

export const FilterDate: FC<Props> = ({formik, value, field, dateFieldProps, submitFormTrigger }) => {
    const { setFieldValue } = formik;
    const handleChange = useCallback(
        (e) => {
            setFieldValue(field, e.currentTarget.value);
            submitFormTrigger?.({});
        },
        [setFieldValue, submitFormTrigger]
    );

    return <DateField value={value}  type='date-range' {...dateFieldProps} onChange={handleChange} />;
};

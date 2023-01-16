import { InputField } from '@vtb/ui-kit3';
import { InputFieldProps } from '@vtb/ui-kit3/dist/components/form/InputField';
import React, { FC, useCallback } from 'react';

import { AnyObject } from '~/types/common';

import { FilterFormProps } from '../../types';

type Props = {
    formik: FilterFormProps;
    value:any;
    field: string;
    type: string;
    inputFieldProps: InputFieldProps;
    submitFormTrigger?: (v: AnyObject) => void;
};

export const FilterInput: FC<Props> = ({formik, value, type, field, inputFieldProps, submitFormTrigger }) => {
    const { setFieldValue } = formik;
    const handleChange = useCallback(
        (e) => {
            setFieldValue(field, e.currentTarget.value);
            submitFormTrigger?.({});
        },
        [setFieldValue, submitFormTrigger]
    );

    return <InputField name={field} value={value} type={type} {...inputFieldProps} onChange={handleChange} />;
};

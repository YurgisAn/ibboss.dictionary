import { InputField } from '@vtb/ui-kit3';
import { InputFieldProps } from '@vtb/ui-kit3/dist/components/form/InputField';
import React, { FC, useCallback } from 'react';

import { AnyObject } from '~/types/common';

import { FilterFormProps } from '../../types';

type Props = {
    formik: FilterFormProps;
    field: string;
    inputFieldProps: InputFieldProps;
    submitFormTrigger?: (v: AnyObject) => void;
};

export const FilterInput: FC<Props> = ({formik, field, inputFieldProps, submitFormTrigger }) => {
    const { setFieldValue } = formik;
    const handleChange = useCallback(
        (e) => {
            setFieldValue(field, e.currentTarget.value);
            submitFormTrigger?.({});
        },
        [setFieldValue, submitFormTrigger]
    );

    return <InputField name={field} type='string' {...inputFieldProps} onChange={handleChange} />;
};

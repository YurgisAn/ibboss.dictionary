/**
 * Компонент распределения типов фильтров
 */
import {InputField, DateField } from '@vtb/ui-kit3';
import React, { FC, useCallback } from 'react';
import { FilterFormProps } from '../types';
import { AnyObject } from '~/types/common';
import { FilterInput } from './FilterInput';


type Props = {
    formik: FilterFormProps;
    field:string;
    type: string;
    label: string;
    submitFormTrigger?: (v: AnyObject) => void; 
};

export const FilterItem: FC<Props> = ({formik, field, type, label, submitFormTrigger }) => {    
    const filter = () => {
        switch(type) {
            case "Text":   return (<FilterInput formik ={formik}
                                                field={field}
                                                submitFormTrigger={submitFormTrigger}
                                                inputFieldProps={{ placeholder: label, dimension: 's' }}/>);
            case "DateRange":   return <DateField  type='date-range'/>;
            default: return <InputField type='string'/>;
        };
    };
    return <>{filter()}</>;
};

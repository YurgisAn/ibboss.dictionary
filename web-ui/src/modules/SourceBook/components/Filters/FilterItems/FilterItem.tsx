/**
 * Компонент распределения типов фильтров
 */
import React, { FC, useCallback } from 'react';
import { FilterFormProps } from '../types';
import { AnyObject } from '~/types/common';
import { FilterDate, FilterInput } from './FilterInput';
import { FieldEditor } from '../constants';
import { ListDto } from '~/shared/models';
import { FilterSearchSelect } from './FilterInput/FilterSearchSelect';


type Props = {
    formik: FilterFormProps;
    value:any;
    field:string;
    type: string;
    label: string;
    list?:ListDto;
    submitFormTrigger?: (v: AnyObject) => void; 
};

export const FilterItem: FC<Props> = ({formik, value, field, type, label, list, submitFormTrigger }) => {   
    const filter = () => {
        switch(type) {
            case FieldEditor.TEXT:   
                    return (<FilterInput formik ={formik}
                                        field={field}
                                        type={'string'}
                                        value={value}
                                        submitFormTrigger={submitFormTrigger}
                                        inputFieldProps={{ label: label, dimension: 's' }}/>);
            case FieldEditor.NUMBER:   
                    return (<FilterInput formik ={formik}
                                        field={field}
                                        value={value}
                                        type={'number'}
                                        submitFormTrigger={submitFormTrigger}
                                        inputFieldProps={{ label: label, dimension: 's' }}/>);
            case FieldEditor.LIST:  
                    return (<FilterSearchSelect formik ={formik}
                                        field={field}
                                        list={list}
                                        value={value}
                                        submitFormTrigger={submitFormTrigger}
                                        fieldProps={{ label: label, dimension: 's' }}/>);

            case FieldEditor.DATE_RANGE:    
                    return (<FilterDate formik ={formik}
                                    field={field}
                                    value={value}
                                    submitFormTrigger={submitFormTrigger}
                                    dateFieldProps={{ label: label, dimension: 's' }}/>);
            case FieldEditor.NONE:
            default:                    
                 return '';
        };
    };
    
    return <div>{filter()}</div>;
};

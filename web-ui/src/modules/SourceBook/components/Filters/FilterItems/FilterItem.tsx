/**
 * Компонент распределения типов фильтров
 */
import React, { FC, useCallback } from 'react';
import { FilterFormProps } from '../types';
import { AnyObject } from '~/types/common';
import { FilterDate, FilterInput } from './FilterInput';
import { FieldEditor } from '../constants';
import { List } from 'lodash';
import { ListDto } from '~/shared/models';
import { FilterSearchSelect } from './FilterInput/FilterSearchSelect';


type Props = {
    formik: FilterFormProps;
    field:string;
    type: string;
    label: string;
    list?:ListDto;
    submitFormTrigger?: (v: AnyObject) => void; 
};

export const FilterItem: FC<Props> = ({formik, field, type, label, list, submitFormTrigger }) => {   
    const filter = () => {
        switch(type) {
            case FieldEditor.TEXT:   
                    return (<FilterInput formik ={formik}
                                        field={field}
                                        type={'string'}
                                        submitFormTrigger={submitFormTrigger}
                                        inputFieldProps={{ label: label, dimension: 's' }}/>);
            case FieldEditor.NUMBER:   
                    return (<FilterInput formik ={formik}
                                        field={field}
                                        type={'number'}
                                        submitFormTrigger={submitFormTrigger}
                                        inputFieldProps={{ label: label, dimension: 's' }}/>);
            case FieldEditor.LIST:  
                    return (<FilterSearchSelect formik ={formik}
                                        field={field}
                                        list={list}
                                        submitFormTrigger={submitFormTrigger}
                                        fieldProps={{ label: label, dimension: 's' }}/>);

            case FieldEditor.DATE_RANGE:    
                    return (<FilterDate formik ={formik}
                                    field={field}
                                    submitFormTrigger={submitFormTrigger}
                                    dateFieldProps={{ label: label, dimension: 's' }}/>);
            case FieldEditor.NONE:
            default:                    
                 return '';
        };
    };
    
    return <div>{filter()}</div>;
};

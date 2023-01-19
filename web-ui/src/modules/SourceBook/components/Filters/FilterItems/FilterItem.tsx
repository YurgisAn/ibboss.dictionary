/**
 * Компонент распределения типов фильтров
 */
import React, { FC, useCallback, useState, useEffect } from 'react';
import { FilterFormProps } from '../types';
import { AnyObject } from '~/types/common';
import { FilterDate, FilterInput } from './FilterInput';
import { FieldEditor } from '../constants';
import { ListDto, ListItemDto } from '~/shared/models';
import { FilterSearchSelect } from './FilterInput/FilterSearchSelect';
import { useApi } from '~/shared/ApiContext';
import { isDefined } from '~/helpers/guards';

type Props = {
    formik: FilterFormProps;
    book:string;
    value:any;
    field:string;
    type: string;
    label: string;
    list?:ListDto;
    submitFormTrigger?: (v: AnyObject) => void; 
};

export const FilterItem: FC<Props> = ({book, formik, value, field, type, label, list, submitFormTrigger }) => {   
    const { sourceBookApi } = useApi();
    const [listItems, setListItems] = useState<Array<ListItemDto> | undefined>(list?.values);
    /**
     * Получаем данные для списков
     */
    const getListItems = useCallback(
        () => {
            sourceBookApi
                .getBookListItems({ 
                            name:book,
                            listName:list?.name ?? ''
                        })
                .then(({ data }) => {
                    isDefined(data);
                    console.log(data);
                    let arr = Array<ListItemDto>();
                    data.map((item) =>(arr.push({"text":item.caption, "value":item.value})));
                    setListItems(arr);
                })
                .catch((err) => {
                    console.error('sourceBookApi.getListItems error', err);                    
                });
        },
        [sourceBookApi, list?.name ]
    );

    const filter = () => {
        //Если нет значание то пытаемся загрузить из списка
        if (type === FieldEditor.LIST && !isDefined(listItems) && isDefined(list?.name))
        {            
            getListItems();
        }

        switch(type) {
            case FieldEditor.TEXT:   
                    return (<FilterInput formik ={formik}
                                        field={field}
                                        type={'string'}
                                        value={value}
                                        submitFormTrigger={submitFormTrigger}
                                        fieldProps={{ label: label, dimension: 's' }}/>);
            case FieldEditor.NUMBER:   
                    return (<FilterInput formik ={formik}
                                        field={field}
                                        value={value}
                                        type={'number'}
                                        submitFormTrigger={submitFormTrigger}
                                        fieldProps={{ label: label, dimension: 's' }}/>);
            case FieldEditor.LIST:  
                    return (<FilterSearchSelect formik ={formik}
                                        field={field}
                                        list={listItems}
                                        value={value}
                                        type={list?.valueType}
                                        submitFormTrigger={submitFormTrigger}
                                        fieldProps={{ label: label, dimension: 's' }}/>);

            case FieldEditor.DATE_RANGE:    
                    return (<FilterDate formik ={formik}
                                    field={field}
                                    value={value}
                                    submitFormTrigger={submitFormTrigger}
                                    fieldProps={{ label: label, dimension: 's' }}/>);
            case FieldEditor.NONE:
            default:                    
                 return '';
        };
    };
    return <div>{filter()}</div>;
};

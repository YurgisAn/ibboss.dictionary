/**
 * Полный фильтр
 */
import { useAuthorization } from '@vtb-ermo/authorization';
import { Button, CheckboxField, DateField, Field, Option, SearchSelectField, Spinner } from '@vtb/ui-kit3';
import React, { FC, ChangeEvent, Suspense, useCallback } from 'react';
import { FilterDto, ListDto } from '~/shared/models';
import * as FilterItems from '../FilterItems';

import { ErrorText } from '../styled';
import { FilterFormProps } from '../types';

import * as S from './styled';

type Props = {
    filters:Array<FilterDto>;
    lists:Array<ListDto>;
    onClose: () => void;
    formik: FilterFormProps;
    isOpen: boolean;
    onCancel: () => void;
};

export const ExtendedFilters: FC<Props> = ({ filters, lists, onCancel, onClose, formik, isOpen }) => {
    const { values, setFieldValue, errors, handleSubmit, setValues } = formik;
    const resetFilterValues = {
        options: {  },
    };

    const handleOnSubmit = useCallback(() => {
        handleSubmit();
    }, [handleSubmit]);

    const handleOnReset = useCallback(() => {
        setValues(resetFilterValues);
    }, [resetFilterValues, setValues]);

    const renderItem = (item: FilterDto, index:number) => {
        return (   
            <FilterItems.FilterItem value={values[item.field]}
                                    formik= {formik}
                                    field = {item.field}
                                    type={item.editor} 
                                    label={item.title}   
                                    list={lists.find((i) => i.name === item.list)}                                    
                                    submitFormTrigger={undefined}
                                    />
        );
      };

    return isOpen ? (
        <S.ExtendedFiltersContainer>
            <S.ExtendedFiltersContent>
                <S.Title>Фильтры</S.Title>
                <S.CloseOutlineIcon onClick={onClose} />
                <S.FiltersForm>  
                    {filters.map((item, index) => renderItem(item, index))}  
                    <S.ButtonsWrapper>
                        <Button dimension='s' appearance='secondary' onClick={handleOnReset}>
                            Сбросить фильтр
                        </Button>
                        <div>
                            <Button dimension='s' appearance='secondary' onClick={onCancel}>
                                Отменить
                            </Button>
                            <Button dimension='s' onClick={handleOnSubmit}>
                                Показать
                            </Button>
                        </div>
                    </S.ButtonsWrapper>
                </S.FiltersForm>
            </S.ExtendedFiltersContent>
        </S.ExtendedFiltersContainer>
    ) : null;
};

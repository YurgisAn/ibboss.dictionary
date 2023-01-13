/**
 * Полный фильтр
 */
import { useAuthorization } from '@vtb-ermo/authorization';
import { Button, CheckboxField, DateField, Field, Option, SearchSelectField, Spinner } from '@vtb/ui-kit3';
import React, { FC, ChangeEvent, Suspense, useCallback } from 'react';

import { ErrorText } from '../styled';
import { FilterFormProps } from '../types';

import * as S from './styled';

type Props = {
    onClose: () => void;
    formik: FilterFormProps;
    isOpen: boolean;
    onCancel: () => void;
};

export const ExtendedFilters: FC<Props> = ({ onCancel, onClose, formik, isOpen }) => {
    const { values, setFieldValue, errors, handleSubmit, setValues } = formik;
    const {
        dateIn
    } = values;


    const resetFilterValues = {
        options: {  },
    };

    const handleOnSubmit = useCallback(() => {
        handleSubmit();
    }, [handleSubmit]);

    const handleOnReset = useCallback(() => {
        setValues(resetFilterValues);
    }, [resetFilterValues, setValues]);

    const handleDateInChange = useCallback(
        (e) => setFieldValue('dateIn', e.currentTarget.value),
        [setFieldValue]
    );

    return isOpen ? (
        <S.ExtendedFiltersContainer>
            <S.ExtendedFiltersContent>
                <S.Title>Фильтры</S.Title>
                <S.CloseOutlineIcon onClick={onClose} />
                <S.FiltersForm>
                    <DateField
                        label='Дата включения в список'
                        type='date-range'
                        value={dateIn}
                        onChange={handleDateInChange}
                        extraText={errors.dateIn ? <ErrorText>{errors.dateIn}</ErrorText> : ''}
                    />         

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

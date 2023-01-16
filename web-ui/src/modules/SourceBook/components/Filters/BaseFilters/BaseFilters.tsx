/**
 * Фильтр свернутый
 */
import { useAuthorization } from '@vtb-ermo/authorization';
import { Tooltip } from '@vtb/ui-kit3';
import { debounce } from 'lodash';
import React, { FC, MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useMousedownOutside } from '~/hooks';
import { ListDto } from '~/shared/models';
import { FilterDto } from '~/shared/models/filter-dto';
import { AnyObject } from '~/types/common';

import { debounceTimeBaseFilters, sortTypeValues, SortType, SortOrder } from '../constants';
import * as FilterItems from '../FilterItems';
import { FilterFormProps } from '../types';

import * as S from './styled';

export interface IFastFiltersProps {
    book:string;
    onExtendedFiltersOpen?: () => void;
    formik: FilterFormProps;
    filters: Array<FilterDto>;
    lists:Array<ListDto>;
    totalCount:number;
}

export const BaseFilters: FC<IFastFiltersProps> = ({
    book,
    totalCount,
    onExtendedFiltersOpen,
    formik,
    filters,
    lists
}) => {
    const { setFieldValue, values, submitForm } = formik;
    const [sortOrder, setSortOrder] = useState(SortOrder.DESC);
    const [isSortByOpened, setIsSortByOpened] = useState(false);
    const [submitDebouncedTrigger, setSubmitDebouncedTrigger] = useState<AnyObject | null>(null);

    const sortByRef = useRef(null);

    const updateSortType = useCallback(
        (sortOrder: SortOrder, sortType: string) => {
            setFieldValue('sortBy', `${sortOrder}${sortType}`);
        },
        [setFieldValue]
    );

    const handleChangeSortType: MouseEventHandler = useCallback(
        (e) => {
            e.preventDefault();

            const selectedSortType: SortType = (e.target as HTMLElement).id as SortType;
            const isSortingTypeChanged = values.sortBy?.indexOf(selectedSortType) === -1;

            if (isSortingTypeChanged) {
                updateSortType(sortOrder, selectedSortType);
            }

            setIsSortByOpened(false);
        },
        [updateSortType, values.sortBy, sortOrder]
    );

    const handleChangeSortOrder = () => {
        const updatedSortOrder = sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
        const isSortingOrderChanged = values.sortBy?.charAt(0) !== updatedSortOrder;

        if (isSortingOrderChanged && values.sortBy) {
            const indexOfComma = values.sortBy.indexOf(',');
            const originSortByString = values.sortBy.substring(1);

            if (indexOfComma !== -1) {
                const updatedSortByValue = originSortByString.replace(
                    `,${values.sortBy.charAt(indexOfComma + 1)}`,
                    `,${sortOrder}`
                );

                updateSortType(updatedSortOrder, updatedSortByValue);
            } else {
                updateSortType(updatedSortOrder, originSortByString);
            }
        }

        setSortOrder(updatedSortOrder);
    };

    const submitDebounced = useMemo(
        () =>
            debounce(() => {
                submitForm();
            }, debounceTimeBaseFilters),
        [submitForm]
    );

    useEffect(() => {
        submitForm();
    }, [values.sortBy, submitForm]);

    useEffect(() => {
        submitDebounced();
    }, [submitDebouncedTrigger, submitDebounced]);

    useMousedownOutside(sortByRef, () => setIsSortByOpened(false));

    const renderItem = (item: FilterDto, index:number) => {
        return (   
            <S.InfoItem>
                <FilterItems.FilterItem book={book} value={values[item.field]}
                                        formik= {formik}
                                        field = {item.field}
                                        type={item.editor} 
                                        label={item.title}   
                                        list={lists.find((i) => i.name === item.list)}                                    
                                        submitFormTrigger={setSubmitDebouncedTrigger}
                                        />
            </S.InfoItem>
        );
      };

    return (
        <S.FastFilters>
            <S.InfoWrapper>
                {filters.map((item, index) => renderItem(item, index))}
                <S.InfoItem>
                    <S.InfoRightContainer>
                        <S.TotalCount>Найдено: {totalCount}</S.TotalCount>
                        <S.ButtonsWrapper>
                            <S.ButtonWrapper onClick={() => onExtendedFiltersOpen?.()}>
                                <Tooltip renderContent={() => 'Фильтр'}>
                                    <S.FilterOutlineIcon />
                                </Tooltip>
                            </S.ButtonWrapper>                           
                        </S.ButtonsWrapper>
                    </S.InfoRightContainer>
                </S.InfoItem>
            </S.InfoWrapper>
        </S.FastFilters>
    );
};

export const emptyShortDatesRange = '__.__.____ - __.__.____';
export const debounceTimeBaseFilters = 500;

/**
 * Сортировка
 */
export const enum SortType {
    BICCODE = 'bic_code',
}

export const enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC',
}

type SortTypeValue = {
    title: string;
    value: string;
};

export const sortTypeValues: Record<SortType, SortTypeValue> = {
    [SortType.BICCODE]: { title: 'БИК', value: 'bic_code' }
};

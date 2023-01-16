export const emptyShortDatesRange = '__.__.____ - __.__.____';
export const debounceTimeBaseFilters = 500;

/**
 * Сортировка
 */
export const enum SortType {
    BICCODE = 'BicCode',
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
    [SortType.BICCODE]: { title: 'БИК', value: 'bicCode' }
};

export const enum FieldEditor {
    NONE = "None",
    DATE_RANGE = "DateRange",
    TEXT = "Text",
    NUMBER = "Number",
    BOOLEAN = "Boolean",
    LIST = "List"
}
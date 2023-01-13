import { FilterFormProps } from '../types';

export type SearchAppTypeProps<T> = {
    setFieldValue: FilterFormProps['setFieldValue'];
    searchValue: T;
};

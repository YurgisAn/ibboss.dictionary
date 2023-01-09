import type { IOptionSuggest } from './index';

export const isString = (value): value is string => typeof value === 'string';

export const defaultFilterOptions = (
  options: Array<string | IOptionSuggest>,
  inputValue: string
) => {
  return options?.filter((option: string | IOptionSuggest) => {
    if (isString(option)) {
      return option?.toLowerCase().includes(inputValue?.toLowerCase());
    } else {
      return option.label?.toLowerCase().includes(inputValue.toLowerCase());
    }
  });
};

export const getInputValue = (value, itemSelected) => {
  if (value === undefined && itemSelected) {
    return !isString(itemSelected) ? itemSelected?.label : itemSelected;
  } else {
    return value || '';
  }
};

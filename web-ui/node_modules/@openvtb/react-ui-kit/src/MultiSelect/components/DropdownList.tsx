import React, { FC, MouseEvent, useCallback } from 'react';

import { Checkbox } from '../../Checkbox';
import {
  OptionWrapper,
  OptionCheckbox,
  OptionContent,
  CheckboxWrapper,
} from '../styled-components/dropdownListComponents';
import { IDropdownListProps, IMultiSelectItemOptions } from '../types';

// Поиск нужной опции среди всех
const findOption: any = (list: IMultiSelectItemOptions[], value: string) => {
  return list.filter((opt: any) => {
    const valueOptions = typeof opt.value === 'number' ? parseFloat(value) : value;
    if (opt.$$typeof) {
      return opt.props['data-value'] === value;
    } else {
      return opt.value === valueOptions;
    }
  })[0];
};

// Поиск нужной опции и удалении её из списка выбранных
export const removeOption: any = (list: IMultiSelectItemOptions[], value: string) => {
  return list.filter((opt: any) => {
    const valueOptions = typeof opt.value === 'number' ? parseFloat(value) : value;
    if (opt.$$typeof) {
      return opt.props['data-value'] !== value;
    } else {
      return opt.value !== valueOptions;
    }
  });
};

const DropdownList: FC<IDropdownListProps> = ({
  size,
  disabled,
  menuIsOpen,
  error,
  dropdownListBorders,
  optionsList,
  currentMultiValue,
  setOpened,
  classNameDropdownList,
  onChange,
}) => {
  // Select value
  const handleOptionClick = useCallback(
    (e) => {
      const { value } = e.currentTarget.dataset;
      setOpened(false);

      if (!findOption(currentMultiValue, value)) {
        onChange([...currentMultiValue, findOption(optionsList, value)]);
      } else {
        onChange(removeOption(currentMultiValue, value));
      }
    },
    [currentMultiValue, optionsList]
  );

  const disableOptionClick = (event: MouseEvent<HTMLDivElement>) => event.stopPropagation();

  const getOptionContent = (item, index) => {
    const itemType = item.$$typeof ? item.props['data-value'] : item.value;
    const itemLabel = item.$$typeof ? item : item.label;
    const itemDisabled = item.$$typeof ? item.props['data-disabled'] : item.disabled;
    const key = item.$$typeof ? (Math.random() * 1000).toString(16) : item.value;
    return (
      <OptionCheckbox
        key={key}
        data-value={itemType}
        onClick={itemDisabled ? disableOptionClick : handleOptionClick}
        size={size}
        disabled={disabled || itemDisabled}
      >
        <CheckboxWrapper>
          <Checkbox
            checked={!!findOption(currentMultiValue, itemType)}
            onChange={() => console.log('')}
            disabled={disabled || itemDisabled}
          />
        </CheckboxWrapper>
        <OptionContent>{itemLabel}</OptionContent>
      </OptionCheckbox>
    );
  };

  return (
    <OptionWrapper
      data-option-wrapper
      size={size}
      dropdownListBorders={dropdownListBorders}
      menuIsOpen={menuIsOpen}
      error={error}
      className={classNameDropdownList}
    >
      {optionsList.map((item: IMultiSelectItemOptions, index: number) =>
        getOptionContent(item, index)
      )}
    </OptionWrapper>
  );
};

export default DropdownList;

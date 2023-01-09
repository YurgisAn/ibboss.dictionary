import React, { ReactNode, FC, useState, useEffect, useCallback } from 'react';

import DropdownList from './components/DropdownList';
import Input from './components/Input';
import type { SelectType, Size } from './constants';
import {
  SELECT_DEFAULT_WIDTH,
  DROPDOWN_MARGIN_BOTTOM_TOP,
  INPUT_BORDER_ERROR,
  INPUT_BORDER_ACTIVE,
  CHIP_DEFAULT_MAX_WIDTH,
} from './constants';
import {
  SelectWrapper,
  Label,
  SelectContainer,
  AdditionalText,
} from './styled-components/otherComponents';
import { IMultiSelectItem } from './types';

export type IMultiSelectItemOptions = IMultiSelectItem | React.ReactNode;

export interface IMultiSelectProps {
  /** Ширина мульти селекта */
  width?: string;
  /** Список опций */
  list: IMultiSelectItemOptions[];
  /** Значение мульти селекта */
  value: IMultiSelectItemOptions[];
  /** Коллбэк на изменение значения multiSelect. MultiSelect является управляемым(controlled) компонентом, поэтому при срабатывании onChange требуется обновления пропса value */
  onChange: (value: IMultiSelectItemOptions[]) => void;
  /** Размер компонента */
  size: Size;
  /** Отключение компонента */
  disabled?: boolean;
  /** Селект с возможностью очищения */
  clearable?: boolean;
  /** Селект в состоянии ошибки */
  error?: boolean;
  /** Верхняя надпись к селекту */
  label?: ReactNode | string;
  /** Плейсхолдер селекта */
  placeholder?: string;
  /** Дополнительный текст под селектом */
  additionalText?: string;
  /** Тип селекта */
  type?: SelectType;
  /** Класс на SelectContainer блок */
  classNameSelectContainer?: string;
  /** Класс на Dropdown блок */
  classNameDropdownList?: string;
  /** Открыть и закрыть меню */
  menuOpenAndClose?: boolean;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** Максимальная ширина чипсов */
  maxWidthChip?: string;
}

export const MultiSelect: FC<IMultiSelectProps> = (props) => {
  const {
    placeholder = '',
    label,
    disabled,
    clearable,
    list,
    value,
    onChange,
    size = 'big',
    additionalText,
    error = false,
    width = SELECT_DEFAULT_WIDTH,
    type = 'default',
    classNameSelectContainer = '',
    classNameDropdownList = '',
    menuOpenAndClose = false,
    className,
    maxWidthChip = CHIP_DEFAULT_MAX_WIDTH,
  } = props;

  // Убираем дублирование данных
  const optionsList = list.reduce(
    (st: any, el: any) =>
      st.map((e: { value: any }) => e.value).includes(el.value) ? st : [...st, el],
    []
  );

  // Дропдаун открыт/закрыт
  const [menuIsOpen, setOpened] = useState<boolean>(!!menuOpenAndClose);

  const [dropdownListBorders, setDropdownListMoveBorders] = useState<boolean>(false);

  useEffect(() => {
    !!menuOpenAndClose && setOpened(menuOpenAndClose);
  });

  const handleSelectWrapperClick = useCallback(() => {
    // При открытии выпадающий список не вылезает за окно браузера
    const optionWrapperDiv = document.querySelector('[data-option-wrapper]');
    const inputContainerDiv = document.querySelector('[data-select-container]');
    const clientHeight = document.documentElement.clientHeight;

    if (optionWrapperDiv && inputContainerDiv) {
      const boxOption = optionWrapperDiv.getBoundingClientRect();
      const boxInput = inputContainerDiv.getBoundingClientRect();

      const bottom = boxOption.top + boxOption.height;
      const bottomHeight = clientHeight - bottom;
      const bottomHeightInput =
        clientHeight -
        bottom -
        boxInput.height -
        parseInt(DROPDOWN_MARGIN_BOTTOM_TOP) -
        parseInt(error ? INPUT_BORDER_ERROR : INPUT_BORDER_ACTIVE) * 2;

      if (bottomHeight < 0) {
        setDropdownListMoveBorders(true);
      }
      if (bottomHeightInput > boxOption.height) {
        setDropdownListMoveBorders(false);
      }
    }

    // Показать / закрыть раскрывающийся список
    menuOpenAndClose ? setOpened(menuOpenAndClose) : setOpened((menuIsOpen: any) => !menuIsOpen);
  }, [setOpened, menuOpenAndClose]);

  const onBlur = (e: any) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpened(false);
    }
  };

  return (
    <SelectWrapper className={className} width={width} data-close-border>
      {label && (
        <Label disabled={disabled} menuIsOpen={menuIsOpen}>
          {label}
        </Label>
      )}
      <SelectContainer
        data-select-container
        disabled={disabled}
        menuIsOpen={menuIsOpen}
        size={size}
        type={type}
        error={error}
        dropdownListBorders={dropdownListBorders}
        tabIndex={1}
        onBlur={onBlur}
        onClick={handleSelectWrapperClick}
        className={classNameSelectContainer}
      >
        <Input
          size={size}
          disabled={disabled}
          placeholder={placeholder}
          clearable={clearable}
          menuIsOpen={menuIsOpen}
          currentMultiValue={value}
          maxWidthChip={maxWidthChip}
          onChange={onChange}
        />
        {!disabled && (
          <DropdownList
            size={size}
            disabled={disabled}
            menuIsOpen={menuIsOpen}
            error={error}
            optionsList={optionsList}
            dropdownListBorders={dropdownListBorders}
            currentMultiValue={value}
            setOpened={setOpened}
            onChange={onChange}
            classNameDropdownList={classNameDropdownList}
          />
        )}
      </SelectContainer>
      {additionalText && (
        <AdditionalText error={error} disabled={disabled} menuIsOpen={menuIsOpen}>
          {additionalText}
        </AdditionalText>
      )}
    </SelectWrapper>
  );
};

import React, {
  useState,
  FC,
  useRef,
  RefObject,
  MutableRefObject,
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
} from 'react';

import type { Status, Size } from '../common';

import { defaultFilterOptions, getInputValue } from './utils';
import { DropDownMenu } from './DropDownMenu';
import { Input } from './Input';
import { Wrapper } from './styled-components';
import {
  CHARS_TO_SHOW_SUGGEST,
  DEFAULT_NOOP_MESSAGE,
  DEFAULT_LOAD_MESSAGE,
  DEFAULT_MENU_HEIGHT,
} from './constants';

export interface IInputSuggest {
  /** Ширина инпута */
  width?: string | number;
  /** Отключение поля ввода */
  disabled?: boolean;
  /** Лейбл инпута */
  label?: string;
  /** Подсказка в поле ввода */
  placeholder?: string;
  /** Текст под инпутом */
  additionalText?: string;
  /** Статус */
  status?: Status;
  /** Аттрибут name */
  inputName?: string;
  /** Уникальный идентификатор */
  id?: string;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Размер инпута */
  size?: Size;
  /** Ref инпута */
  refInput?:
    | MutableRefObject<HTMLInputElement>
    | MutableRefObject<null>
    | RefObject<HTMLInputElement>;
  /** Контейнер, в котором при необходимости можно отрисовать тултип через ReactDOM.createPortal */
  tooltipContainer?: Element | null;
  /** Массив опций */
  options: (string | IOptionSuggest<any>)[];
  /** Количество символов, после которого будут показаны подсказки */
  charsToShowSuggest?: number;
  /** Текст сообщения если не найден ни один элемент */
  noopMessage?: string;
  /** Загрузка данных */
  load?: boolean;
  /** Текст сообщения  при загрузке данных */
  loadMessage?: string;
  /** Очищаемое поле */
  clearable?: boolean;
  /** Коллбек на изменение блюр */
  onBlur?: (event: FocusEvent<HTMLInputElement>, value: string) => void;
  /** Коллбек на изменение фокуса */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Коллбек на нажатие клавиш */
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  /** Функция фильтрации опций */
  filterOptions?: (options: (string | IOptionSuggest<any>)[]) => (string | IOptionSuggest<any>)[];
  /** Максимальная высота выпадающего меню */
  menuMaxHeight?: string | number;
  /** Выпадающее меню */
  menuIsOpen?: boolean;
  /** Коллбек на изменение состояния input */
  onInputChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  /** Коллбек для кастомизации опций */
  renderElementOption?: (options: string | IOptionSuggest<any>) => any;
  /** Коллбек для выбора опций dropDown */
  onChange: (value: string | IOptionSuggest<any>) => void;
  /** Значение dropdown */
  selectedItem?: string | IOptionSuggest<any>;
  /** Значение инпута */
  value?: string;
}

export interface IOptionSuggest<T = any> {
  id: string | number;
  label: string;
  value?: T;
}

export const InputSuggest: FC<IInputSuggest> = ({
  options = [],
  size = 'big',
  className,
  load = false,
  dataTestId,
  noopMessage = DEFAULT_NOOP_MESSAGE,
  charsToShowSuggest = CHARS_TO_SHOW_SUGGEST,
  disabled,
  loadMessage = DEFAULT_LOAD_MESSAGE,
  tooltipContainer,
  menuMaxHeight = DEFAULT_MENU_HEIGHT,
  filterOptions,
  additionalText,
  onChange,
  menuIsOpen,
  renderElementOption,
  onInputChange,
  value,
  selectedItem,
  ...otherProps
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [inputValue, setInputValue] = useState(getInputValue(value, selectedItem));

  const inputRef: RefObject<HTMLInputElement> = useRef(null);

  const shouldRenderDropdown =
    menuIsOpen === undefined
      ? inputValue.length >= charsToShowSuggest && showMenu && !disabled
      : inputValue.length >= charsToShowSuggest && menuIsOpen && !disabled;

  return (
    <Wrapper className={className} data-test-id={dataTestId}>
      <Input
        value={inputValue}
        size={size}
        inputRef={inputRef}
        setShowMenu={menuIsOpen === undefined ? setShowMenu : undefined}
        disabled={disabled}
        additionalText={menuIsOpen || showMenu ? undefined : additionalText}
        onInputchange={onInputChange}
        setInputValue={setInputValue}
        onChangeSelected={onChange}
        {...otherProps}
      />

      <DropDownMenu
        load={load}
        options={filterOptions ? filterOptions(options) : defaultFilterOptions(options, inputValue)}
        size={size}
        setShowMenu={setShowMenu}
        showMenu={showMenu}
        menuIsOpen={menuIsOpen}
        noopMessage={noopMessage}
        inputRef={inputRef}
        tooltipContainer={tooltipContainer}
        loadMessage={loadMessage}
        menuMaxHeight={menuMaxHeight}
        renderElementOption={renderElementOption}
        onChange={onChange}
        setInputValue={setInputValue}
        inputValue={inputValue}
        selectedItem={selectedItem}
        shouldRenderDropdown={shouldRenderDropdown}
      />
    </Wrapper>
  );
};

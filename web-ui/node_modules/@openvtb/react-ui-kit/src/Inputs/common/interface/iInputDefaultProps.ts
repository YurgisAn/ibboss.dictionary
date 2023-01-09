import { ChangeEvent, FocusEvent, KeyboardEvent, MutableRefObject, RefObject } from 'react';

import { Size, Status } from '../types';
export interface IInputDefaultProps {
  /** Коллбек на изменение состояния */
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
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
  /** Коллбек на изменение блюр */
  onBlur?: (event: FocusEvent<HTMLInputElement>, value: string) => void;
  /** Коллбек на изменение фокуса */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Коллбек на нажатие клавиш */
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  /** Максимальное количество символов */
  maxLength?: number;
  /** Дефолтное значение инпута */
  defaultValue?: any;
  /** Ref инпута */
  refInput?:
    | MutableRefObject<HTMLInputElement>
    | MutableRefObject<null>
    | RefObject<HTMLInputElement>;
  /** Контейнер, в котором при необходимости можно отрисовать тултип через ReactDOM.createPortal */
  tooltipContainer?: Element | null;
}

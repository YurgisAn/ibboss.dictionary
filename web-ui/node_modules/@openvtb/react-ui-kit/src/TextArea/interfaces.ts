import { ReactNode } from 'react';
import { TextareaAutosizeProps } from 'react-textarea-autosize';

import { Status } from './constants';

export type LimitLabelCallback = (
  currentValue: ITextAreaProps['initialValue'],
  props: ITextAreaProps
) => string | ReactNode;

export interface ITextAreaProps
  extends Pick<
    TextareaAutosizeProps,
    | 'value'
    | 'onChange'
    | 'onHeightChange'
    | 'useCacheForDOMMeasurements'
    | 'minRows'
    | 'maxRows'
    | 'onFocus'
    | 'onBlur'
  > {
  /** Идентификатор поля */
  id?: string;
  /** Имя поля */
  name?: string;
  /** Ширина поля */
  width?: string | number;
  /** Отключение поля */
  disabled?: boolean;
  /** Лейбл для поля */
  label?: string;
  /** Имя класса для переопределения стилей (для оборачивающего div) */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Имя класса для элемента textarea */
  elementClassname?: string;
  /** Может ли пользователь изменять размеры поля с помощью мышки */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline';
  /** Только чтение */
  readOnly?: boolean;
  /** Плейсхолдер для поля */
  placeholder?: string;
  /** Начальное значение для поля */
  initialValue?: TextareaAutosizeProps['value'];
  /** Ограничение на количество символов и отображние подсказки под полем */
  limit?: number;
  /** Разрешить вводить текст длинной свыше limit */
  aboveLimit?: boolean;
  /** Функция генерации текста подсказки о количестве символов и лимите */
  limitLabel?: LimitLabelCallback;
  /** Установить статус поля */
  status?: Status;
  /** Текст ошибки */
  errorText?: string;
}

export interface IThemeAndStatus {
  $status?: Status;
}

export interface ITextareaWrapperProps extends IThemeAndStatus {
  $focused?: boolean;
  $width: number | string;
  disabled?: boolean;
}

export interface ITextareaComponentProps extends IThemeAndStatus {
  $resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline';
  $focused?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
}

import React from 'react';
import type { FC, KeyboardEvent, MouseEvent, ReactElement } from 'react';

import { KEY_CODES } from '../common';

import { CheckboxComponent } from './CheckboxComponent';
import { Mark } from './Mark';
import { IndeterminateMark } from './IndeterminateMark';
import { Input } from './Input';
import { Label } from './Label';
import { TickIcon, IndeterminateMarkIcon } from './icons';
import { CheckboxSize } from './constants';

export interface ICheckboxProps {
  /** Коллбэк на изменение состояния. Срабатывает при клике или нажатии Enter/Space при переходе по табу */
  onChange: (
    evt: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    checked: boolean,
    id?: string | number
  ) => void;
  /** Состояние чекбокса: выбран/не выбран */
  checked?: boolean;
  /** Уникальный идентификатор чекбокса */
  id?: string | number;
  /** Размер чекбокса */
  size?: CheckboxSize;
  /** Подпись к чекбоксу */
  label?: string | ReactElement;
  /** Отключение чекбокса */
  disabled?: boolean;
  /** Неопределенное состояние чекбокса */
  indeterminate?: boolean;
  /** Состояние ошибки чекбокса */
  error?: boolean;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
}

export const Checkbox: FC<ICheckboxProps> = ({
  onChange,
  checked = false,
  id,
  size = 'big',
  label,
  disabled,
  indeterminate,
  error,
  className,
  dataTestId,
}: ICheckboxProps) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      onChange && onChange(event, !checked, id);
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!disabled && (event.keyCode === KEY_CODES.ENTER || event.keyCode === KEY_CODES.SPACEBAR)) {
      onChange && onChange(event, !checked, id);
    }
  };

  const renderLabel = () => {
    if (typeof label === 'string') {
      const LabelWrapper = Label(size);
      return <LabelWrapper disabled={disabled}>{label}</LabelWrapper>;
    }

    return label;
  };

  const withLabel = Boolean(label);

  return (
    <CheckboxComponent
      className={className}
      data-test-id={dataTestId}
      size={size}
      tabIndex={1}
      disabled={disabled}
      onKeyUp={handleKeyUp}
      onClick={handleClick}
    >
      <Input type="checkbox" readOnly checked={checked} disabled={disabled} />
      {indeterminate ? (
        <IndeterminateMark disabled={disabled} size={size} tabIndex={-1} withLabel={withLabel}>
          <IndeterminateMarkIcon />
        </IndeterminateMark>
      ) : (
        <Mark
          checked={checked}
          disabled={disabled}
          error={!checked && error}
          size={size}
          tabIndex={-1}
          withLabel={withLabel}
        >
          <TickIcon />
        </Mark>
      )}
      {withLabel && renderLabel()}
    </CheckboxComponent>
  );
};

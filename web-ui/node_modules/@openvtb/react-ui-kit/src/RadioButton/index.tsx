import React, { FC, MouseEvent, KeyboardEvent } from 'react';

import { KEY_CODES } from '../common';

import { Mark } from './Mark';
import { Input } from './Input';
import { Label } from './Label';
import { RadioButtonComponent } from './RadioButtonComponent';
import { RadioButtonSize } from './constants';

export interface IRadioButtonProps {
  /** Коллбэк на изменение состояния. Срабатывает при клике или нажатии Enter/Space при переходе по табу */
  onChange: (event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>, value: any) => void;
  /** Подпись к радиокнопке */
  label: string;
  /** Значение радиокнопки */
  value: any;
  /** Состояние радиокнопки: выбрана/не выбрана */
  checked: boolean;
  /** Размер радиокнопки */
  size?: RadioButtonSize;
  /** Отключение радиокнопки */
  disabled?: boolean;
  /** Состояние ошибки радиокнопки */
  error?: boolean;
  /** Атрибут name радиокнопки */
  name?: string;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
}

export const RadioButton: FC<IRadioButtonProps> = ({
  label,
  name,
  value,
  checked,
  disabled,
  error,
  size = 'big',
  className,
  dataTestId,
  onChange,
}: IRadioButtonProps) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      onChange && onChange(event, value);
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!disabled && (event.keyCode === KEY_CODES.ENTER || event.keyCode === KEY_CODES.SPACEBAR)) {
      onChange && onChange(event, value);
    }
  };
  const LabelWrapper = Label(size);
  return (
    <RadioButtonComponent
      tabIndex={1}
      size={size}
      error={!checked && error}
      disabled={disabled}
      onKeyUp={handleKeyUp}
      onClick={handleClick}
      className={className}
      data-test-id={dataTestId}
    >
      <Input
        type="radio"
        readOnly
        name={name}
        checked={checked}
        value={value || ''}
        disabled={disabled}
      />
      <Mark tabIndex={-1} size={size} disabled={disabled} />
      <LabelWrapper disabled={disabled}>{label}</LabelWrapper>
    </RadioButtonComponent>
  );
};

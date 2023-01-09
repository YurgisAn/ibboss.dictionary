import React, { FC, MouseEvent, KeyboardEvent } from 'react';

import { Body2Short, Body1Short } from '../Typography';
import { KEY_CODES } from '../common';

import { SwitchComponent } from './SwitchComponent';
import { SwitchInput } from './SwitchInput';
import { SwitchSlider } from './SwitchSlider';
import { SwitchWrapper } from './SwitchWrapper';
import type { LabelPosition, Size } from './SwitchSlider';

export interface ISwitchProps {
  /** Состояние свитча: выставлен/не выставлен */
  checked?: boolean;
  /** Коллбэк на изменение состояния. Срабатывает при клике или переходу по табу */
  onChange: (
    event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    checked: boolean
  ) => void;
  /** Подпись к свитчу */
  label?: string;
  /** Расположение подписи */
  labelPosition?: LabelPosition;
  /** Отключение свитча */
  disabled?: boolean;
  /** Размер свитча */
  size?: Size;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
}

export const Switch: FC<ISwitchProps> = ({
  label,
  labelPosition = 'right',
  disabled = false,
  size = 'big',
  checked = false,
  className,
  dataTestId,
  onChange,
}) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      onChange && onChange(event, !checked);
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!disabled && (event.keyCode === KEY_CODES.ENTER || event.keyCode === KEY_CODES.SPACEBAR)) {
      onChange && onChange(event, !checked);
    }
  };

  // To prevent focus event, firing on click
  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => event.preventDefault();

  const SwitchLabel = size === 'small' ? Body2Short : Body1Short;

  return (
    <SwitchComponent
      className={className}
      data-test-id={dataTestId}
      onKeyUp={handleKeyUp}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      disabled={disabled}
      tabIndex={1}
    >
      {label && labelPosition === 'left' && <SwitchLabel>{label}</SwitchLabel>}
      <SwitchWrapper>
        <SwitchInput checked={checked} readOnly $size={size} type="checkbox" />
        <SwitchSlider
          checked={checked}
          disabled={disabled}
          labelPosition={labelPosition}
          size={size}
        />
      </SwitchWrapper>
      {label && labelPosition === 'right' && <SwitchLabel>{label}</SwitchLabel>}
    </SwitchComponent>
  );
};

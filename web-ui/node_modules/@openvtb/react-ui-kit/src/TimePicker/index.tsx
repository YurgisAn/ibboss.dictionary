import React, { useState, FC, useRef, FocusEvent, useCallback } from 'react';

import type { Size } from '../Inputs/common/types';
import { getIconSize } from '../Inputs/common/utils';
import { InputMask } from '../Inputs/Mask';
import { ReactComponent as TimeOutline } from '../Icons/system/TimeOutline.svg';

import { ADDITIONAL_MESSAGE, DEFAULT_WIDTH, MASK } from './components/constants';
import { IconWrapper, Wrapper } from './StyledComponents';
import {
  timeValid,
  parseValue,
  formatValue,
  validateUserTimeRange,
  activeTimeParse,
} from './utils';
import { DropdownMenu } from './components/DropdownMenu';

export type TTime = {
  hours: string;
  minutes: string;
};

export interface ITimePickerProps {
  /** Значение компонента */
  value: TTime;
  /** Коллбек на изменение состояния */
  onChange: (value: TTime) => void;
  /** Лэйбл к инпуту */
  label?: string;
  /** Размер инпута */
  size?: Size;
  /** Флаг блокировки */
  disabled?: boolean;
  /** Коллбэк на событие фокуса инпута */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Коллбэк на событие потери фокуса инпута */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Минимальное значение интервала селекта */
  selectRangeStart?: TTime;
  /** Максимальное значение интервала селекта */
  selectRangeEnd?: TTime;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** Уникальный идентификатор */
  id?: string;
  /** Ширина инпута */
  width?: string | number;
  /** Дополнительный текст под инпутом */
  additionalText?: string;
}

export const TimePicker: FC<ITimePickerProps> = ({
  value = { hours: '', minutes: '' },
  onChange,
  selectRangeStart,
  selectRangeEnd,
  dataTestId,
  className,
  size = 'big',
  disabled,
  additionalText = ADDITIONAL_MESSAGE,
  onBlur,
  onFocus,
  width = DEFAULT_WIDTH,
  id,
  ...props
}) => {
  const inputRef = useRef<any>(null);
  const [error, setError] = useState(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const valueInput = parseValue(value);

  const handleChange = (value: { value: string; masked: string }) => {
    setMenuOpen(false);
    onChange && onChange(formatValue(value));
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    onFocus && onFocus(event);
    setError(false);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setError(timeValid(value, valueInput));
    onBlur && onBlur(event);
    setMenuOpen(false);
  };

  const handleComplete = useCallback((value: string) => {
    onTimeSelect(value);
  }, []);

  const onTimeSelect = (time: string) => {
    const value = time.replace(/\D+/g, '');

    onChange &&
      onChange({
        hours: `${value[0]}${value[1]}`,
        minutes: `${value[2]}${value[3]}`,
      });
    setMenuOpen(false);
  };

  const handleClickIcon = () => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
      inputRef.current.focus();
    }
  };

  const { rangeStart, rangeEnd } = validateUserTimeRange(selectRangeStart, selectRangeEnd);
  const iconSize = getIconSize(size);

  const icon = (
    <IconWrapper disabled={disabled} active={menuOpen} onMouseDown={(e) => e.preventDefault()}>
      <TimeOutline
        width={iconSize}
        height={iconSize}
        onClick={disabled ? undefined : handleClickIcon}
      />
    </IconWrapper>
  );
  return (
    <Wrapper dataTestId={dataTestId} className={className} width={width}>
      <InputMask
        icon={icon}
        id={id}
        mask={MASK}
        onFocus={handleFocus}
        disabled={disabled}
        refInput={inputRef}
        onBlur={handleBlur}
        status={error ? 'error' : 'default'}
        additionalText={error ? additionalText : ''}
        onComplete={handleComplete}
        size={size}
        value={valueInput}
        onChange={handleChange}
        alwaysShowMask
        width={width}
        {...props}
      />
      <DropdownMenu
        size={size}
        open={menuOpen}
        onTimeSelect={onTimeSelect}
        activeTime={activeTimeParse(value)}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
      />
    </Wrapper>
  );
};

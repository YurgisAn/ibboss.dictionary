import React, { useState, useCallback, FC, useEffect } from 'react';

import { Input } from '../BaseField';
import { INCREMENT, DECREMENT, DEFAULT_MAX_INPUT_LENGTH } from '../constants';
import { formatValue, getIconSize } from '../common';
import type { IInputDefaultProps } from '../common/interface';

import { getIntegerMaxValue, getResultValue } from './utils';
import { StyledPlusOutline } from './StyledPlusOutline';
import { StyledMinusOutline } from './StyledMinusOutline';
import { IconWrapper } from './IconWrapper';

export interface IInputNumberProps extends IInputDefaultProps {
  /** Значение инпута */
  value?: string;
  /** Шаг прибавления или убавления значения */
  step?: number;
  /** Суффикс */
  suffix?: string;
  /** Максимальное количество символов в поле ввода */
  maxLength?: number;
  /** Флаг отключения иконок прибавления или убавления */
  withoutIconServices?: boolean;
  /** Флаг ввода дробной части */
  withCoins?: boolean;
}

export const InputNumber: FC<IInputNumberProps> = ({
  value = '',
  disabled,
  size = 'big',
  onChange,
  status,
  step = 100,
  maxLength = DEFAULT_MAX_INPUT_LENGTH,
  withoutIconServices,
  withCoins,
  ...props
}) => {
  const [iconIsActive, setIconIsActive] = useState<boolean>(false);
  const [plusDisabled, setPlusDisabled] = useState<boolean>(!!disabled);
  const [minusDisabled, setMinusDisabled] = useState<boolean>(!!disabled);
  const maxValue = getIntegerMaxValue(maxLength);
  const minValue = 0;

  useEffect(() => {
    const cantDecrement = minValue > +formatValue(value) - step;
    const cantIncrement = maxValue < +formatValue(value) + step;
    cantDecrement !== minusDisabled && setMinusDisabled(cantDecrement);
    cantIncrement !== plusDisabled && setPlusDisabled(cantIncrement);
  }, [value]);

  const handleDecrement = useCallback(
    (event: any) => {
      onChange?.(event, getResultValue(value, step, DECREMENT));

      setIconIsActive(true);
    },
    [onChange, step, value]
  );

  const handleIncrement = useCallback(
    (event: any) => {
      onChange?.(event, getResultValue(value, step, INCREMENT));

      setIconIsActive(true);
    },
    [onChange, step, value]
  );

  const iconSize = getIconSize(size);
  const iconServices = (
    <IconWrapper size={size}>
      <StyledMinusOutline
        onClick={!minusDisabled && !disabled ? handleDecrement : undefined}
        width={iconSize}
        height={iconSize}
        disabled={disabled || minusDisabled}
      />
      <StyledPlusOutline
        onClick={!plusDisabled && !disabled ? handleIncrement : undefined}
        width={iconSize}
        height={iconSize}
        disabled={disabled || plusDisabled}
      />
    </IconWrapper>
  );

  return (
    <Input
      disabled={disabled}
      size={size}
      status={status}
      onChange={onChange}
      value={value}
      iconServices={withoutIconServices ? null : iconServices}
      iconIsActive={iconIsActive}
      setIconIsActive={setIconIsActive}
      maxLength={maxLength}
      number
      withCoins={withCoins}
      {...props}
    />
  );
};

import React, { useState, ReactNode, FocusEvent, FC } from 'react';

import { Input } from '../BaseField';
import { getIconSize } from '../common/utils/getIconSize';
import type { IInputDefaultProps } from '../common/interface/iInputDefaultProps';

import { StyledСloseOutline } from './StyledСloseOutline';
import { StyledErrorSolid } from './StyledErrorSolid';

export interface IInputTextProps extends IInputDefaultProps {
  /** Значение инпута */
  value?: string | undefined;
  /** Очищаемое поле */
  clearable?: boolean;
  /** Дополнительная иконка */
  icon?: ReactNode;
}

export const InputText: FC<IInputTextProps> = ({
  value = '',
  disabled,
  size = 'big',
  onChange,
  status,
  clearable,
  onFocus,
  onBlur,
  ...props
}) => {
  const [errorActive, setErrorActive] = useState(false);
  const handleClickClearIcon = (event: any): void => {
    !disabled && onChange?.(event, '');
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setErrorActive(true);
    onFocus && onFocus(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setErrorActive(false);
    onBlur && onBlur(event, value);
  };

  const iconSize = getIconSize(size);
  const shouldRenderIconServices = (status === 'error' && !disabled) || clearable;
  /* Иконки которые подразумевают действия и которые мы добавляем в поля ввода */
  const iconServices = (
    <>
      {status === 'error' && !disabled ? (
        <StyledErrorSolid width={iconSize} height={iconSize} $active={errorActive} />
      ) : (
        clearable && (
          <StyledСloseOutline
            width={iconSize}
            height={iconSize}
            disabled={disabled}
            onClick={handleClickClearIcon}
          />
        )
      )}
    </>
  );

  return (
    <Input
      withTooltip
      size={size}
      status={status}
      disabled={disabled}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={onChange}
      iconServices={shouldRenderIconServices && iconServices}
      value={value}
      {...props}
    />
  );
};

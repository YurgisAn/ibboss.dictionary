import React, { useState, ReactNode, FC } from 'react';

import { Input } from '../BaseField';
import { getIconSize } from '../common';
import type { IInputDefaultProps } from '../common/interface';
import type { Type } from '../common/types';

import { StyledEyeSolid } from './StyledEyeSolid';
import { StyledEyeCloseOutline } from './StyledEyeCloseOutline';

export interface IInputPassword extends IInputDefaultProps {
  /** Значение инпута */
  value?: string | undefined;
  /** Дополнительная иконка */
  icon?: ReactNode;
}

export const InputPassword: FC<IInputPassword> = ({
  value = '',
  disabled,
  status,
  size = 'big',
  onChange,
  ...props
}) => {
  const [showPassword, setShow] = useState(false);
  const [typeInput, setTypeInput] = useState<Type>('password');

  const handleTogglePassword = () => {
    !disabled && setShow(!showPassword);
    !disabled && showPassword ? setTypeInput('password') : setTypeInput('text');
  };

  const handleClickClearingInput = (event: any) => {
    status === 'error' && onChange && onChange(event, '');
  };

  const iconSize = getIconSize(size);
  const iconServices = (
    <>
      {!showPassword ? (
        <StyledEyeSolid
          onMouseDown={handleTogglePassword}
          width={iconSize}
          height={iconSize}
          disabled={disabled}
        />
      ) : (
        <StyledEyeCloseOutline
          onMouseDown={handleTogglePassword}
          width={iconSize}
          height={iconSize}
          disabled={disabled}
        />
      )}
    </>
  );

  return (
    <Input
      type={typeInput}
      size={size}
      disabled={disabled}
      status={status}
      iconServices={iconServices}
      onClick={(event: any) => handleClickClearingInput && handleClickClearingInput(event)}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
};

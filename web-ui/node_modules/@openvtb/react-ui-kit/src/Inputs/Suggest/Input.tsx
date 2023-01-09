import React, { ChangeEvent, FocusEvent, useState, FC, Dispatch, RefObject } from 'react';

import { getIconSize } from '../common';
import { StyledErrorSolid } from '../Text/StyledErrorSolid';
import { StyledСloseOutline } from '../Text/StyledСloseOutline';
import { Input as BaseInput } from '../BaseField';
import { ReactComponent as SearchOutline } from '../../Icons/system/SearchOutline.svg';
import type { IInputDefaultProps, Size } from '../common';

import { IconWrapper, StyledSearchOutline, InputWrapper } from './styled-components';

interface IInputProps extends IInputDefaultProps {
  setShowMenu?: Dispatch<React.SetStateAction<boolean>>;
  value?: string;
  clearable?: boolean;
  size: Size;
  inputRef: RefObject<HTMLInputElement>;
  onInputchange?: (event, value: string) => void;
  menuIsOpen?: boolean;
  setInputValue: Dispatch<React.SetStateAction<string>>;
  onChangeSelected: (value: any) => void;
}

export const Input: FC<IInputProps> = ({
  onInputchange,
  onBlur,
  onFocus,
  disabled,
  value,
  size,
  status,
  clearable,
  setShowMenu,
  inputRef,
  additionalText,
  setInputValue,
  onChangeSelected,
  ...props
}) => {
  const [errorActive, setErrorActive] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>, value: string) => {
    onInputchange?.(event, value);
    setInputValue(value);
    setShowMenu?.(true);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>, value: string) => {
    setErrorActive(false);
    setShowMenu?.(false);
    onBlur?.(event, value);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    onFocus?.(event);

    setErrorActive(true);
  };

  const handleClearIconClick = (event: any): void => {
    !disabled && handleChange(event, '');
    onChangeSelected?.('');
  };

  const iconSize = getIconSize(size);
  const iconServices = (
    <IconWrapper>
      {status === 'error' && !disabled ? (
        <StyledErrorSolid width={iconSize} $active={errorActive} />
      ) : (
        clearable && (
          <StyledСloseOutline width={iconSize} disabled={disabled} onClick={handleClearIconClick} />
        )
      )}
      <StyledSearchOutline disabled={disabled}>
        <SearchOutline width={iconSize} height={iconSize} />
      </StyledSearchOutline>
    </IconWrapper>
  );

  return (
    <InputWrapper>
      <BaseInput
        withTooltip
        size={size}
        status={status}
        refInput={inputRef}
        disabled={disabled}
        iconServices={iconServices}
        additionalText={additionalText}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </InputWrapper>
  );
};

import styled, { css } from 'styled-components';

import { getInputSize, getBorderRadius, getBorder } from '../utils-style';
import { DEFAULT_THEME } from '../../../common';
import type { Size, Status } from '../../common';

export interface IInputWrapperProps {
  size: Size;
  focused: boolean;
  status: Status;
  disabled?: boolean;
  range?: boolean;
}

export const InputWrapper = styled.div<IInputWrapperProps>`
  ${({ theme, disabled, focused, status, size, range }) => css`
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    height: ${getInputSize(size)}px;
    margin: 0;
    border-radius: ${disabled ? `${getBorderRadius(theme, range)}` : 'none'};
    background-color: ${disabled ? theme.color.neutral[10] : theme.color.neutral.white};
    ::before {
      content: '';
      pointer-events: none;
      top: 0;
      position: absolute;
      background: transparent;
      border: ${getBorder(theme, disabled, focused, status)};
      border-radius: ${getBorderRadius(theme, range)};
      width: 100%;
      height: ${getInputSize(size)}px;
    }
    &:hover::before {
      border-color: ${!focused && status === 'default' && !disabled
        ? theme.color.neutral[50]
        : 'none'};
    }
    &:focus::before {
      outline: none;
      background-color: ${theme.color.neutral.white};
    }
  `}
`;

InputWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

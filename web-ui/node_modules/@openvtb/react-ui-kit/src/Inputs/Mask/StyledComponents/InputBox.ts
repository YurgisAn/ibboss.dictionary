import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../../common';
import { getInputSize, getBorder, getBorderRadius } from '../../BaseField/utils-style';
import type { Size, Status } from '../../common';

interface IInputBox {
  disabled?: boolean;
  focused: boolean;
  size: Size;
  status: Status;
}

export const InputBox = styled.div<IInputBox>`
  ${({ disabled, theme, focused, size, status }) => css`
    height: ${getInputSize(size)}px;
    display: flex;
    background-color: ${disabled ? theme.color.neutral[10] : theme.color.neutral.white};
    border-radius: ${disabled ? `${getBorderRadius(theme)}` : 'none'};
    ::before {
      content: '';
      position: absolute;
      background: transparent;
      border: ${getBorder(theme, disabled, focused, status)};
      border-radius: ${getBorderRadius(theme)};
      width: 100%;
      height: ${getInputSize(size)}px;
      pointer-events: none;
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

InputBox.defaultProps = {
  theme: DEFAULT_THEME,
};

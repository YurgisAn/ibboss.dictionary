import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';

const SIZE = 40;

interface IButtonProps {
  selected?: boolean;
  disabled?: boolean;
  withEllipsis?: boolean;
}

export const Button = styled.button<IButtonProps>`
  ${({ disabled, selected, theme, withEllipsis }) => css`
    align-items: center;
    background: ${selected ? theme.color.primary[60] : 'transparent'};
    border-radius: ${theme.borderRadius};
    border: none;
    color: ${selected ? theme.color.neutral.white : theme.color.neutral[90]};
    cursor: ${withEllipsis ? 'default' : 'pointer'};
    display: flex;
    height: ${SIZE}px;
    justify-content: center;
    outline: none;
    user-select: none;
    width: ${SIZE}px;

    & svg {
      fill: ${theme.color.neutral[90]};
    }

    &:focus {
      background: ${disabled || selected || withEllipsis ? '' : theme.color.opacity.blackFocus};
    }

    &:hover {
      background: ${disabled || selected || withEllipsis ? '' : theme.color.opacity.blackHover};
    }

    &:active {
      background: ${disabled || selected || withEllipsis ? '' : theme.color.opacity.blackPressed};
    }

    &:disabled {
      background: transparent;
      color: ${theme.color.neutral[30]};
      cursor: default;

      & svg {
        fill: ${theme.color.neutral[30]};
      }
    }
  `};
`;

Button.defaultProps = {
  theme: DEFAULT_THEME,
};

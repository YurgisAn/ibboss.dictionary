import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { getKindStyle } from './getKindStyle';
import type { Size } from './ButtonGroupComponent';

const PADDING_HORIZONTAL = {
  medium: 24,
  small: 20,
  micro: 16,
};

const BORDER_WIDTH = 1;

export type Kind = 'solid' | 'outlined';

interface IButtonProps {
  active: boolean;
  disabled: boolean;
  kind: Kind;
  size: Size;
}

export const Button = styled.div<IButtonProps>`
  ${({ active, disabled, kind, size, theme }) => css`
    align-items: center;
    border-radius: ${theme.borderRadius};
    border-style: solid;
    border-width: ${BORDER_WIDTH}px;
    box-sizing: border-box;
    color: ${disabled ? theme.color.neutral[30] : theme.color.neutral[50]};
    cursor: ${disabled ? 'default' : 'pointer'};
    display: flex;
    padding: 0 ${PADDING_HORIZONTAL[size] - BORDER_WIDTH}px;
    position: relative;

    & div svg {
      fill: ${disabled ? theme.color.neutral[30] : theme.color.neutral[50]};
    }

    &:focus {
      outline: none;

      &::after {
        border-radius: ${theme.borderRadius};
        border-style: solid;
        border-width: 1px;
        bottom: 2px;
        content: '';
        display: block;
        left: 2px;
        position: absolute;
        right: 2px;
        top: 2px;
      }
    }

    ${getKindStyle({ active, disabled, kind, theme })};
  `};
`;

Button.defaultProps = {
  theme: DEFAULT_THEME,
};

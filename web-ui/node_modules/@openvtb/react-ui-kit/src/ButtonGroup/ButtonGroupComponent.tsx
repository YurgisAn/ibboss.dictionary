import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';

import type { Kind } from './Button';

export type Size = 'medium' | 'small' | 'micro';

export const SIZE = {
  medium: 48,
  small: 40,
  micro: 32,
};

interface IButtonGroupComponentProps {
  kind: Kind;
  size: Size;
}

export const ButtonGroupComponent = styled.div<IButtonGroupComponentProps>`
  ${({ kind, size, theme }) => css`
    background: ${kind === 'solid' ? theme.color.neutral[10] : 'transparent'};
    border-radius: ${theme.borderRadius};
    display: flex;
    height: ${SIZE[size]}px;
  `};
`;

ButtonGroupComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

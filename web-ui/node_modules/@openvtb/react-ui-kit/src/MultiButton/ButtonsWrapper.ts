import styled from 'styled-components';

import { DEFAULT_THEME } from '../common';
import { ITheme } from '../themes';

import { Separator } from './Separator';

export type Kind = 'primary' | 'secondary';

interface IButtonsWrapperProps {
  kind: Kind;
  disabled?: boolean;
}

export const getSeparatorBackgroundColor = (
  kind: Kind,
  theme: ITheme,
  disabled?: boolean,
  active?: boolean
) => {
  if (disabled) return kind === 'primary' ? theme.color.neutral[10] : 'transparent';
  if (active) return kind === 'primary' ? theme.color.primary[60] : 'transparent';
  return kind === 'primary' ? theme.color.primary[60] : 'transparent';
};

export const getSeparatorBorderColor = (
  kind: Kind,
  theme: ITheme,
  disabled?: boolean,
  active?: boolean
) => {
  if (disabled) return kind === 'primary' ? theme.color.neutral[10] : theme.color.neutral[30];
  if (active) return kind === 'primary' ? theme.color.primary[60] : 'none';
  return theme.color.primary[60];
};

export const getSeparatorAfterColor = (
  kind: Kind,
  theme: ITheme,
  disabled?: boolean,
  active?: boolean
) => {
  if (disabled) return theme.color.neutral[30];
  if (active) return kind === 'primary' ? theme.color.opacity.whiteMedium : theme.color.primary[60];
  return kind === 'primary' ? theme.color.opacity.whiteMedium : theme.color.primary[60];
};

export const ButtonsWrapper = styled.div<IButtonsWrapperProps>`
  display: flex;
  & > ${Separator} {
    background: ${({ kind, theme, disabled }) =>
      getSeparatorBackgroundColor(kind, theme, disabled)};
    border-top: 1px solid
      ${({ kind, theme, disabled }) => getSeparatorBorderColor(kind, theme, disabled)};
    border-bottom: 1px solid
      ${({ kind, theme, disabled }) => getSeparatorBorderColor(kind, theme, disabled)};
    &:after {
      background: ${({ kind, theme, disabled }) => getSeparatorAfterColor(kind, theme, disabled)};
    }
  }

  &:active {
    & ${Separator} {
      background: ${({ kind, theme, disabled }) =>
        getSeparatorBackgroundColor(kind, theme, disabled, true)};
      border-top: 1px solid
        ${({ theme, kind, disabled }) => getSeparatorBorderColor(kind, theme, disabled, true)};
      border-bottom: 1px solid
        ${({ theme, kind, disabled }) => getSeparatorBorderColor(kind, theme, disabled, true)};
      &:after {
        background: ${({ kind, theme, disabled }) =>
          getSeparatorAfterColor(kind, theme, disabled, true)};
      }
    }
  }
`;

ButtonsWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

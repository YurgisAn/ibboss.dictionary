import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';
import type { ITheme } from '../themes';
import { Subtitle1, Body1Short, Caption1 } from '../Typography';

export type Size = 56 | 48 | 40 | 32 | 24;
export type Kind =
  | 'white'
  | 'light'
  | 'grey'
  | 'dark'
  | 'blue'
  | 'green'
  | 'red'
  | 'orange'
  | 'purple'
  | 'yellow';

const MARGIN = {
  56: '12px',
  48: '10px',
  40: '8px',
  32: '6px',
  24: '4px',
};

const getBackgroundColor = (kind: Kind, theme: ITheme) => {
  switch (kind) {
    case 'white':
      return theme.color.neutral.white;
    case 'light':
      return theme.color.neutral[10];
    case 'grey':
      return theme.color.neutral[50];
    case 'dark':
      return theme.color.neutral[80];
    case 'blue':
      return theme.color.primary[20];
    case 'green':
      return theme.color.success[20];
    case 'red':
      return theme.color.error[20];
    case 'orange':
      return theme.color.warning[20];
    case 'purple':
      return theme.color.extraOne[20];
    case 'yellow':
      return theme.color.attention[20];
  }
};

const getContentColor = (kind: Kind, theme: ITheme) => {
  if (kind === 'grey' || kind === 'dark') return theme.color.neutral.white;
  return theme.color.neutral[90];
};

const commonWrapperStyles = (size: Size, kind: Kind, theme: ITheme) => css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;
  background-color: ${getBackgroundColor(kind, theme)};
  color: ${getContentColor(kind, theme)};
  text-transform: uppercase;
  user-select: none;
  overflow: hidden;

  img,
  svg {
    width: 100%;
    height: 100%;
  }

  svg {
    fill: ${getContentColor(kind, theme)};
    margin: ${MARGIN[size]};
  }
`;

interface IWrapperProps {
  size: Size;
  kind: Kind;
}

const BigWrapper = styled(Subtitle1)<IWrapperProps>`
  ${({ size, kind, theme }) => commonWrapperStyles(size, kind, theme)};
`;

BigWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

const MediumWrapper = styled(Body1Short)<IWrapperProps>`
  ${({ size, kind, theme }) => commonWrapperStyles(size, kind, theme)};
`;

MediumWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

const SmallWrapper = styled(Caption1)<IWrapperProps>`
  ${({ size, kind, theme }) => commonWrapperStyles(size, kind, theme)};
`;

SmallWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

export const Wrapper = (size: Size) => {
  switch (size) {
    case 56:
      return BigWrapper;
    case 48:
    case 40:
      return MediumWrapper;
    case 32:
    case 24:
      return SmallWrapper;
  }
};

import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { TabsSize, UNDERLINE_HEIGHT, getPadding, getMargin, getMenuMargin } from './constants';

interface IWrapperProps {
  mobile: boolean;
  underline?: boolean;
  width?: string | number;
}

interface ICommonProps {
  size: TabsSize;
}

export const Wrapper = styled.div<IWrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: ${({ mobile, width }) =>
    width && !mobile ? (typeof width === 'number' ? `${width}px` : width) : '100%'};
  overflow: visible;

  &::before {
    position: absolute;
    bottom: 0;
    content: '';
    height: ${UNDERLINE_HEIGHT};
    width: 100%;
    background-color: ${({ theme, underline }) =>
      underline ? theme.color.neutral[20] : 'transparent'};
  }
`;

Wrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

export const MenuWrapper = styled.div<ICommonProps>`
  margin: ${({ size, theme }) => getMenuMargin(size, theme)};
`;

MenuWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

export const TabsWrapper = styled.div<ICommonProps>`
  display: flex;

  ${({ theme, size }) =>
    theme.tabs.useMargin &&
    css`
      & > div {
        margin-right: ${getMargin(size)};
      }
      & > div:last-child {
        margin-right: 0;
      }
    `}
`;

TabsWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

const commonSubComponentsStyles = css`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const BadgeWrapper = styled.div.attrs({ tabIndex: -1 })`
  ${commonSubComponentsStyles}
  padding-right: ${({ theme }) => getPadding(theme)};
`;

BadgeWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

export const IconWrapper = styled.div.attrs({ tabIndex: -1 })`
  ${commonSubComponentsStyles}
  padding-left: ${({ theme }) => getPadding(theme)};
`;

IconWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

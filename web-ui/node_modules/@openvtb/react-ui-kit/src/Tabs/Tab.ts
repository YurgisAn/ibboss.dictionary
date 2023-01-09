import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { TabsSize, TAB_HEIGHT_SMALL, TAB_HEIGHT_BIG } from './constants';

interface ITabProps {
  active?: boolean;
  disabled?: boolean;
  size: TabsSize;
}

export const Tab = styled.div<ITabProps>`
  display: flex;
  align-items: center;
  transition: all 0.2s;
  user-select: none;
  &:focus,
  & > div:focus {
    outline: none;
  }

  color: ${({ active, disabled, theme }) => {
    if (disabled) {
      return active ? theme.tabs.activeTextColor : theme.color.neutral[30];
    }
    return active ? theme.tabs.activeTextColor : theme.color.neutral[50];
  }};

  ${({ disabled, theme, size }) => css`
    height: ${size === 'small' ? TAB_HEIGHT_SMALL : TAB_HEIGHT_BIG};
    cursor: ${disabled ? 'default' : 'pointer'};
    & svg {
      fill: ${disabled ? theme.color.neutral[30] : theme.color.neutral[50]};
    }
    &:focus {
      ${theme.tabs.focus}
    }
  `}

  ${({ theme, disabled }) =>
    !disabled &&
    css`
      &:hover {
        ${theme.tabs.hover}
      }
      &:active {
        ${theme.tabs.active}
      }
    `}
`;

Tab.defaultProps = {
  theme: DEFAULT_THEME,
};

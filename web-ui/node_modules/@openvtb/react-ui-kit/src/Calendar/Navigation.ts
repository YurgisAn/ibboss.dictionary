import styled from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { navigationLeftRightStyle, navigationUpDownStyle } from './utils';

export const NavigationPanel = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const NavigationPrevious = styled.div<{
  disabled: boolean;
}>`
  ${({ theme, disabled }) => navigationLeftRightStyle(theme, 6, disabled)}
`;

NavigationPrevious.defaultProps = {
  theme: DEFAULT_THEME,
};

export const NavigationNext = styled.div<{
  disabled: boolean;
}>`
  ${({ theme, disabled }) => navigationLeftRightStyle(theme, 6, disabled)}
`;

NavigationNext.defaultProps = {
  theme: DEFAULT_THEME,
};

export const NavigationYearDown = styled.div`
  ${({ theme }) => navigationUpDownStyle(theme, 6, false)}
`;

NavigationYearDown.defaultProps = {
  theme: DEFAULT_THEME,
};

export const NavigationYearUp = styled.div`
  ${({ theme }) => navigationUpDownStyle(theme, 6, false)}
  margin-left: 8px;
`;

NavigationYearUp.defaultProps = {
  theme: DEFAULT_THEME,
};

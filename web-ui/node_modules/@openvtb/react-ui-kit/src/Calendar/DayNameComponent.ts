import styled from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { CalendarSize, DAY_SIZES, DAY_NAMES_BOTTOM_MARGINS } from './constants';
import { fontStyle } from './utils';

export const DayNameComponent = styled.div<{ size: CalendarSize }>`
  display: inline-block;
  user-select: none;
  text-transform: uppercase;

  ${({ theme, size }) => `
    width: ${DAY_SIZES[size]}px;
    margin: 0 0 ${DAY_NAMES_BOTTOM_MARGINS[size]}px;
    color: ${theme.color.neutral[30]};
    ${fontStyle(size)}
  `}
`;

DayNameComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { CalendarSize, SIZES, DAY_VIEW_PADDINGS, YEAR_VIEW_PADDINGS } from './constants';
import { fontStyle } from './utils';

interface ICalendarComponentProps {
  size: CalendarSize;
  yearView: boolean;
  simple?: boolean;
}

export const CalendarComponent = styled.div<ICalendarComponentProps>`
  position: relative;
  text-align: center;
  border: 0 none;
  z-index: 0; /* to fix range rounded corners fill */

  ${({ theme, size, yearView, simple }) => css`
    width: ${SIZES[size]}px;
    padding: ${yearView ? YEAR_VIEW_PADDINGS[size] : DAY_VIEW_PADDINGS[size]};
    background: ${theme.color.neutral.white};
    box-shadow: ${theme.boxShadow[8]};
    border-radius: ${simple
      ? theme.borderRadius
      : `0 0 ${theme.borderRadius} ${theme.borderRadius}`};
    ${fontStyle(size)}
  `}
`;

CalendarComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

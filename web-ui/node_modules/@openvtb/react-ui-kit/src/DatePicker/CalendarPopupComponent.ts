import styled from 'styled-components';

import { Z_INDEXES, DEFAULT_THEME } from '../common';

interface ICalendarPopupComponentProps {
  position: {
    X: number;
    Y: number;
  };
}

export const CalendarPopupComponent = styled.div<ICalendarPopupComponentProps>`
  position: fixed;
  left: ${({ position: { X } }) => X}px;
  top: ${({ position: { Y }, theme }) => Y + theme.input.dropdownMenuPadding}px;
  z-index: ${Z_INDEXES.DATEPICKERCALENDAR};
`;

CalendarPopupComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

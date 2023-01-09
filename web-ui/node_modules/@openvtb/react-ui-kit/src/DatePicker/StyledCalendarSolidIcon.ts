import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';
import { IStyledIconDefaultProps, getDefaultIconStyled } from '../Inputs/common';

export const StyledCalendarSolidIcon = styled.div<IStyledIconDefaultProps>`
  ${({ theme, disabled, active }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    & svg {
      ${getDefaultIconStyled(theme, disabled, active)}
    }
  `}
`;

StyledCalendarSolidIcon.defaultProps = {
  theme: DEFAULT_THEME,
};

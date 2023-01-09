import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { CalendarSize, HEADER_PADDINGS } from './constants';

export const HeaderComponent = styled.div<{ size: CalendarSize }>`
  ${({ theme, size }) => css`
    background-color: ${theme.color.primary[60]};
    color: ${theme.color.neutral.white};
    border-radius: ${theme.borderRadius} ${theme.borderRadius} 0 0;
    padding: ${HEADER_PADDINGS[size]};
    box-shadow: ${theme.boxShadow[8]};
  `}
`;

HeaderComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

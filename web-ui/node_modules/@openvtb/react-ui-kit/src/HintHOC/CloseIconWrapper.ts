import styled, { css } from 'styled-components';

import { DEFAULT_THEME, markerStyle } from '../common';

const MARKER_OFFSET = 6;
const RIGHT = 16;
const TOP = 12;

export const CloseIconWrapper = styled.div<{ light?: boolean }>`
  ${({ light, theme }) => css`
    align-items: center;
    display: flex;
    position: absolute;
    right: ${RIGHT}px;
    top: ${TOP}px;
    ${markerStyle(theme, MARKER_OFFSET, !light)};

    &:hover {
      cursor: pointer;
    }

    & svg {
      fill: ${light ? theme.color.neutral[50] : theme.color.neutral.white};
    }
  `};
`;

CloseIconWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

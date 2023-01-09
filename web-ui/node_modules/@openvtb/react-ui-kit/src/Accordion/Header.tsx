import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';

export const PADDING_HORIZONTAL = 16;

const HEIGHT = 48;
const HEIGHT_SMALL = 40;

export const Header = styled.div<{ small: boolean }>`
  ${({ small, theme }) => css`
    align-items: center;
    cursor: pointer;
    display: flex;
    height: ${small ? HEIGHT_SMALL : HEIGHT}px;
    justify-content: space-between;
    padding: 0 ${PADDING_HORIZONTAL}px;

    & svg {
      fill: ${theme.color.neutral[50]};
    }

    &:focus,
    &:hover {
      background-color: ${theme.color.opacity.blackHover};
      outline: none;
    }
  `};
`;

Header.defaultProps = {
  theme: DEFAULT_THEME,
};

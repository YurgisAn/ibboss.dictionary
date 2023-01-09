import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { UNDERLINE_HEIGHT } from './constants';

interface IUnderLineProps {
  left: number;
  width: number;
}

export const Underline = styled.div<IUnderLineProps>`
  position: absolute;
  z-index: 1;
  bottom: 0;
  ${({ theme, left, width }) => css`
    display: ${width ? 'block' : 'none'};
    left: ${left}px;
    width: ${width}px;
    background-color: ${theme.color.primary[60]};
  `}
  height: ${UNDERLINE_HEIGHT};
  transition: all 0.2s ease-out;
`;

Underline.defaultProps = {
  theme: DEFAULT_THEME,
};

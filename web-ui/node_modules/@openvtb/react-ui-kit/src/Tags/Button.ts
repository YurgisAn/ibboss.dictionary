import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';

import {
  SHAPE_MICRO,
  TYPE_BORDER,
  BORDER_COLOR_TRANSPARENT,
  MAX_WIDTH,
  BORDER_RADIUS,
} from './constants';
import { getBackgroundColor } from './utils-style';

export type Kind = 'grey' | 'blue' | 'orange' | 'red' | 'green';

export interface ITagProps {
  kind: Kind;
  onClick?: (id: string, label: string) => void;
  width?: number | string;
}

export const Button = styled.button<ITagProps>`
  ${({ onClick, width, theme: { color }, kind }) => css`
    color: ${color.neutral[90]};
    background-color: ${getBackgroundColor(kind, color)};
    border-radius: ${SHAPE_MICRO};
    overflow: hidden;
    cursor: ${onClick ? 'pointer' : 'default'};
    padding-top: 2px;
    padding-bottom: 2px;
    margin-top: 12px;
    max-width: ${MAX_WIDTH};
    width: ${typeof width === 'number' ? `${width}px` : width};
    border: ${BORDER_RADIUS} ${TYPE_BORDER} ${getBackgroundColor(kind, color)};
    white-space: nowrap;
    &:focus {
      outline: none;
    }
    &:focus {
      border: ${BORDER_RADIUS} ${TYPE_BORDER}
        ${onClick ? `${color.primary[60]}` : `${BORDER_COLOR_TRANSPARENT}`};
    }
    &:active {
      border: ${BORDER_RADIUS} ${TYPE_BORDER}
        ${onClick ? `${color.primary[60]}` : `${BORDER_COLOR_TRANSPARENT}`};
    }
  `}
`;

Button.defaultProps = {
  theme: DEFAULT_THEME,
};

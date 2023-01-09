import styled, { css } from 'styled-components';

import { DEFAULT_THEME, Z_INDEXES } from '../common';

import { POINTER_HEIGHT, POINTER_WIDTH } from './constants';
import { getPointerAlignStyle, getPointerDirectionStyle } from './utils';
import type { Align, Direction } from './constants';

const PADDING = '12px 52px 12px 16px';

interface IHint {
  light?: boolean;
  offset?: number;
  pointerAlign: Align;
  pointerDirection: Direction;
  position: { posX: number; posY: number };
  visible?: boolean;
  width: number;
}

export const Hint = styled.div<IHint>`
  ${({
    light,
    offset,
    pointerAlign,
    pointerDirection,
    position: { posX, posY },
    theme,
    visible,
    width,
  }) => css`
    align-items: center;
    background: ${light ? theme.color.neutral.white : theme.color.neutral[80]};
    border-radius: ${theme.borderRadius};
    box-shadow: ${light ? theme.boxShadow[12] : 'none'};
    box-sizing: border-box;
    color: ${light ? theme.color.neutral[90] : theme.color.neutral.white};
    display: flex;
    left: ${posX}px;
    padding: ${PADDING};
    position: fixed;
    top: ${offset ? posY + offset : posY}px;
    visibility: ${visible ? 'visible' : 'hidden'};
    width: ${width}px;
    z-index: ${Z_INDEXES.HINT};

    &::after {
      border-color: transparent transparent
        ${light ? theme.color.neutral.white : theme.color.neutral[80]} transparent;
      border-style: solid;
      border-width: 0 ${POINTER_HEIGHT}px ${POINTER_HEIGHT}px ${POINTER_HEIGHT}px;
      content: '';
      height: 0;
      position: absolute;
      width: 0;
      ${getPointerAlignStyle(pointerAlign, POINTER_WIDTH)};
      ${getPointerDirectionStyle(pointerDirection, POINTER_HEIGHT)};
    }
  `};
`;

Hint.defaultProps = {
  theme: DEFAULT_THEME,
};

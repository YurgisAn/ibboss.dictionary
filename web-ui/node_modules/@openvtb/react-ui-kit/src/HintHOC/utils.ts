import { css } from 'styled-components';

import { POINTER_HEIGHT, POINTER_MARGIN, POINTER_WIDTH, SAFE_SPACE } from './constants';
import type { Align, Direction } from './constants';

const HINT_MARGIN = 4;

interface ISize {
  width: number;
  height: number;
}

interface IRect extends ISize {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export const getPointerDirectionStyle = (direction: Direction, height: number) => {
  switch (direction) {
    case 'top':
      return css`
        bottom: -${height}px;
        transform: rotate(180deg);
      `;
    case 'bottom':
    default:
      return css`
        top: -${height}px;
      `;
  }
};

export const getPointerAlignStyle = (align: Align, width: number) => {
  switch (align) {
    case 'left':
      return css`
        right: ${POINTER_MARGIN}px;
      `;
    case 'center':
      return css`
        left: calc(50% - (${width}px / 2));
      `;
    case 'right':
    default:
      return css`
        left: ${POINTER_MARGIN}px;
      `;
  }
};

export const findDirection = (componentRect: IRect, targetRect: IRect) => {
  const viewPortHeight = window.innerHeight;
  if (viewPortHeight < targetRect.bottom + HINT_MARGIN + componentRect.height + SAFE_SPACE) {
    return 'top';
  }
  return 'bottom';
};

export const findAlign = (componentRect: IRect, targetRect: IRect): Align => {
  const viewPortWidth = window.innerWidth;
  const componentHorizontalAvailableSpace =
    componentRect.width - (targetRect.width + POINTER_WIDTH) / 2 - POINTER_MARGIN + SAFE_SPACE;
  if (targetRect.left >= componentHorizontalAvailableSpace) {
    return 'left';
  }
  if (viewPortWidth - targetRect.left >= componentHorizontalAvailableSpace) {
    return 'right';
  }
  return 'center';
};

export const calculatePosition = (
  direction: Direction,
  align: Align,
  componentSize: ISize,
  targetSize: ISize,
  offset: ISize
) => {
  let posX: number, posY: number;

  switch (direction) {
    case 'top':
      posY = -(componentSize.height + POINTER_HEIGHT + HINT_MARGIN);
      break;
    case 'bottom':
    default:
      posY = targetSize.height + POINTER_HEIGHT + HINT_MARGIN;
      break;
  }

  switch (align) {
    case 'left':
      posX = (targetSize.width + POINTER_WIDTH) / 2 + POINTER_MARGIN - componentSize.width;
      break;
    case 'center':
      posX = (targetSize.width - componentSize.width) / 2;
      break;
    case 'right':
    default:
      posX = (targetSize.width - POINTER_WIDTH) / 2 - POINTER_MARGIN;
      break;
  }
  return { posX: posX + offset.width, posY: posY + offset.height };
};

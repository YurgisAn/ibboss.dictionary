import { css } from 'styled-components';

import { getContainingBlockOffset } from '../common/utils';

import {
  POINTER_HEIGHT,
  POINTER_WIDTH,
  SAFE_SPACE,
  TOOLTIP_HEIGHT,
  TOOLTIP_MARGIN,
} from './constants';

import type { ITooltipHOCProps } from './';

export const findTooltipDirection = (wrapperRect: DOMRect, tooltipRect: DOMRect) => {
  const { width: tooltipWidth } = tooltipRect;
  const {
    bottom: wrapperBottom,
    left: wrapperLeft,
    right: wrapperRight,
    width: wrapperWidth,
  } = wrapperRect;

  const viewPortHeight = window.innerHeight;
  const viewPortWidth = window.innerWidth;

  const tooltipHorizontalAvailableSpace = (tooltipWidth - wrapperWidth) / 2 + SAFE_SPACE;

  if (viewPortWidth - wrapperRight < tooltipHorizontalAvailableSpace) {
    return 'left';
  }

  if (wrapperLeft < tooltipHorizontalAvailableSpace) {
    return 'right';
  }

  if (viewPortHeight < wrapperBottom + TOOLTIP_MARGIN + TOOLTIP_HEIGHT + SAFE_SPACE) {
    return 'top';
  }

  return 'bottom';
};

export const calculateTooltipPosition = (
  target: Element,
  tooltip: Element,
  direction: ITooltipHOCProps['direction'] = 'bottom'
) => {
  const { width: tooltipWidth, height: tooltipHeight } = tooltip.getBoundingClientRect();
  const { width: targetWidth, height: targetHeight } = target.getBoundingClientRect();

  const { targetX, targetY } = getTargetOffset(target, targetWidth, targetHeight);
  const defaultOffset = getDefaultOffset(targetWidth, targetHeight, tooltipWidth, tooltipHeight);
  const { parentTop, parentLeft } = getContainingBlockOffset(tooltip);

  return {
    posX: targetX + defaultOffset[direction].left - parentLeft,
    posY: targetY + defaultOffset[direction].top - parentTop,
  };
};

export const getPointerPositionStyle = (pointerDirection: ITooltipHOCProps['direction']) => {
  const widthAndHeightDevision = POINTER_WIDTH / POINTER_HEIGHT;

  switch (pointerDirection) {
    case 'left':
      return css`
        left: -${POINTER_HEIGHT + widthAndHeightDevision}px;
        top: calc(50% - (${POINTER_HEIGHT}px / 2));
        transform: rotate(-90deg);
      `;

    case 'right':
      return css`
        right: -${POINTER_HEIGHT + widthAndHeightDevision}px;
        top: calc(50% - (${POINTER_HEIGHT}px / 2));
        transform: rotate(90deg);
      `;

    case 'bottom':
      return css`
        bottom: -${POINTER_HEIGHT}px;
        left: calc(50% - (${POINTER_WIDTH}px / 2));
        transform: rotate(180deg);
      `;

    case 'top':
    default:
      return css`
        left: calc(50% - (${POINTER_WIDTH}px / 2));
        top: -${POINTER_HEIGHT}px;
      `;
  }
};

const getTargetOffset = (target: Element, targetWidth: number, targetHeight: number) => {
  const { top: targetTop, left: targetLeft } = target.getBoundingClientRect();
  return {
    targetX: targetLeft + targetWidth / 2,
    targetY: targetTop + targetHeight / 2,
  };
};

const getDefaultOffset = (
  targetWidth: number,
  targetHeight: number,
  tooltipWidth: number,
  tooltipHeight: number
) => {
  const top = {
    left: -(tooltipWidth / 2),
    top: -(targetHeight / 2 + tooltipHeight + TOOLTIP_MARGIN),
  };
  const bottom = {
    left: -(tooltipWidth / 2),
    top: targetHeight / 2 + TOOLTIP_MARGIN,
  };
  const left = {
    left: -(tooltipWidth + targetWidth / 2 + TOOLTIP_MARGIN),
    top: -(tooltipHeight / 2),
  };
  const right = {
    left: targetWidth / 2 + TOOLTIP_MARGIN,
    top: -(tooltipHeight / 2),
  };

  return { top, bottom, left, right };
};

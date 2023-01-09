import styled, { css } from 'styled-components';

import { DEFAULT_THEME, Z_INDEXES } from '../common';

import { getPointerPositionStyle } from './utils';
import { POINTER_HEIGHT, TOOLTIP_HEIGHT, TOOLTIP_HORIZONTAL_PADDING } from './constants';

import type { ITooltipHOCProps } from './index';

interface ITooltipProps {
  light?: boolean;
  pointerDirection: ITooltipHOCProps['direction'];
  position: { posX: number; posY: number };
  showTooltip: boolean;
}

export const Tooltip = styled.div<ITooltipProps>`
  ${({ light, pointerDirection, position: { posX, posY }, showTooltip, theme }) => css`
    align-items: center;
    background: ${light ? theme.color.neutral.white : theme.color.neutral[80]};
    border-radius: ${theme.borderRadius};
    box-shadow: ${light ? theme.boxShadow[12] : 'none'};
    color: ${light ? theme.color.neutral[90] : theme.color.neutral.white};
    display: flex;
    height: ${TOOLTIP_HEIGHT}px;
    left: ${posX}px;
    padding: 0 ${TOOLTIP_HORIZONTAL_PADDING}px;
    position: fixed;
    top: ${posY}px;
    visibility: ${showTooltip ? 'visible' : 'hidden'};
    white-space: nowrap;
    z-index: ${Z_INDEXES.TOOLTIP};

    &::after {
      border-color: transparent transparent
        ${light ? theme.color.neutral.white : theme.color.neutral[80]} transparent;
      border-style: solid;
      border-width: 0 ${POINTER_HEIGHT}px ${POINTER_HEIGHT}px ${POINTER_HEIGHT}px;
      content: '';
      height: 0;
      position: absolute;
      width: 0;
      ${getPointerPositionStyle(pointerDirection)};
    }
  `};
`;

Tooltip.defaultProps = {
  theme: DEFAULT_THEME,
};

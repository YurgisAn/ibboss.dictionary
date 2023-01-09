import styled from 'styled-components';

import { Body2Short } from '../Typography';

import { Caption } from './Caption';
import {
  STEP_HORZ_WIDTH,
  STEP_HORZ_HEIGHT,
  STEP_VERT_HEIGHT,
  STEP_WIDTH,
  STEP_HEIGHT,
  ICON_CONTENT_MARGIN,
} from './constants';
import { IStepColors, getMargin } from './utils';

export type Direction = 'horizontal' | 'vertical';
export type StepState = 'current' | 'completed' | 'next' | 'error';

interface IStepComponentProps {
  direction: Direction;
  stepState: StepState;
  colors: IStepColors;
  disabled?: boolean;
}

export const StepComponent = styled.div<IStepComponentProps>`
  outline: none;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  ${Body2Short} {
    height: ${2 * STEP_HEIGHT}px;
    width: ${STEP_WIDTH}px;
    margin-left: calc(8px - ${({ stepState }) => getMargin(stepState)}px);
    padding-top: 2px;
  }
  ${({ colors }) => `
    color: ${colors.text};
    & svg {
      fill: ${colors.icon};
      margin-top: -${ICON_CONTENT_MARGIN}px;
      margin-left: -${ICON_CONTENT_MARGIN}px;
    }
    ${Caption} {
      color: ${colors.iconText};
      background: ${colors.icon};
    }
  `}

  ${({ direction, colors }) =>
    direction === 'horizontal'
      ? `
      width: ${STEP_HORZ_WIDTH}px;
      height: ${STEP_HORZ_HEIGHT}px;
      border-top: 2px solid ${colors.line};
      padding-top: 12px;
    `
      : `
      height: ${STEP_VERT_HEIGHT}px;
      border-left: 2px solid ${colors.line};
      padding-left: 10px;
  `}
`;

import { css, keyframes } from 'styled-components';

import type { ITheme } from '../themes';

import {
  CheckboxSize,
  MARK_BEFORE_OFFSET,
  MARK_HEIGHT_BIG,
  MARK_HEIGHT_SMALL,
  MARK_WIDTH_BIG,
  MARK_WIDTH_SMALL,
  CHECKBOX_MARGIN,
  CHECKBOX_MARGIN_WITH_LABEL,
  INDETERMINATE_SVG_WIDTH_BIG,
  INDETERMINATE_SVG_WIDTH_SMALL,
  BASIC_SVG_WIDTH_BIG,
  BASIC_SVG_WIDTH_SMALL,
} from './constants';

export const checkOn = keyframes`
  from {
    stroke-dashoffset: 450;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const svgIndeterminateWidth = (size?: CheckboxSize) =>
  size === 'small' ? INDETERMINATE_SVG_WIDTH_SMALL : INDETERMINATE_SVG_WIDTH_BIG;
const svgBasicWidth = (size?: CheckboxSize) =>
  size === 'small' ? BASIC_SVG_WIDTH_SMALL : BASIC_SVG_WIDTH_BIG;

export const commonMarkStyle = (
  theme: ITheme,
  size?: CheckboxSize,
  indeterminate?: boolean,
  withLabel?: boolean
) => css`
  box-sizing: border-box;
  position: relative;
  flex: 0 0 auto;
  height: ${size === 'small' ? MARK_HEIGHT_SMALL : MARK_HEIGHT_BIG};
  width: ${size === 'small' ? MARK_WIDTH_SMALL : MARK_WIDTH_BIG};
  margin: ${withLabel
    ? `${CHECKBOX_MARGIN} ${CHECKBOX_MARGIN_WITH_LABEL} ${CHECKBOX_MARGIN} ${CHECKBOX_MARGIN}`
    : CHECKBOX_MARGIN};

  &:before {
    content: '';
    position: absolute;
    top: ${MARK_BEFORE_OFFSET};
    left: ${MARK_BEFORE_OFFSET};
    right: ${MARK_BEFORE_OFFSET};
    bottom: ${MARK_BEFORE_OFFSET};
    background-color: transparent;
    border-radius: 50%;
  }

  &:focus {
    outline: none;
  }

  svg {
    position: absolute;
    width: ${indeterminate ? svgIndeterminateWidth(size) : svgBasicWidth(size)};
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    path {
      stroke-dasharray: 450;
      stroke-dashoffset: 450;
    }
  }
`;

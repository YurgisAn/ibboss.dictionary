import styled, { css } from 'styled-components';

import { LINE_HEIGHT_INPUT } from '../constants';
import { TYPOGRAPHY } from '../../../Typography';
import { DEFAULT_THEME } from '../../../common';
import type { Size } from '../../common';

import { getColorMask } from './SpanMask';
interface ISpanNumberMask {
  size: Size;
  disabled?: boolean;
  active?: boolean;
  focused?: boolean;
  borderPosition?: boolean;
}

export const SpanNumberMask = styled.label<ISpanNumberMask>`
  ${({ size, theme, disabled, focused, borderPosition, active }) => css`
    border-bottom: ${active ? 'none' : `0.7px solid ${getColorMask(theme, disabled, focused)}`};
    white-space: pre;
    font-family: ${TYPOGRAPHY.fontFamily};
    font-size: ${size === 'micro' ? TYPOGRAPHY.fontSize[14] : TYPOGRAPHY.fontSize[16]};
    line-height: ${size === 'micro' ? TYPOGRAPHY.lineHeight[20] : `${LINE_HEIGHT_INPUT}px`};
    font-weight: ${TYPOGRAPHY.fontWeight.regular};
    font-stretch: normal;
    font-style: normal;
    font-feature-settings: 'tnum' on, 'lnum' on, 'cv03' on, 'cv04' on;
    box-sizing: content-box;
    font-optical-sizing: none;
    color: transparent;
    top: ${borderPosition ? -3 : 0}px;
    position: relative;
  `}
`;

SpanNumberMask.defaultProps = {
  theme: DEFAULT_THEME,
};

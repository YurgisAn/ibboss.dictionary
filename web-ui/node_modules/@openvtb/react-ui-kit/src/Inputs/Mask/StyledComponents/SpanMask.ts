import styled, { css } from 'styled-components';

import { LINE_HEIGHT_INPUT } from '../constants';
import { TYPOGRAPHY } from '../../../Typography';
import { DEFAULT_THEME } from '../../../common';
import type { ITheme } from '../../../themes';
import type { Size } from '../../common';
interface ISpanMask {
  size: Size;
  disabled?: boolean;
  active?: boolean;
  symbolsFilled?: boolean;
  focused?: boolean;
}

export const getColorMask = (theme: ITheme, disabled = false, focused = false) => {
  if (disabled) return theme.color.neutral[30];
  if (focused) return theme.color.neutral[90];

  return theme.color.neutral[50];
};

export const SpanMask = styled.span<ISpanMask>`
  ${({ size, theme, disabled, active, symbolsFilled, focused }) => css`
    border-bottom: ${active || symbolsFilled
      ? 'none'
      : `0.7px solid ${getColorMask(theme, disabled, !focused)}`};
    white-space: pre;
    position: relative;
    font-family: ${TYPOGRAPHY.fontFamily};
    font-size: ${size === 'micro' ? TYPOGRAPHY.fontSize[14] : TYPOGRAPHY.fontSize[16]};
    line-height: ${size === 'micro' ? TYPOGRAPHY.lineHeight[20] : `${LINE_HEIGHT_INPUT}px`};
    font-weight: ${TYPOGRAPHY.fontWeight.regular};
    font-stretch: normal;
    font-style: normal;
    font-feature-settings: 'tnum' on, 'lnum' on, 'cv03' on, 'cv04' on;
    box-sizing: content-box;
    cursor: text;
    color: ${active ? 'transparent' : getColorMask(theme, disabled, focused)};
  `}
`;

SpanMask.defaultProps = {
  theme: DEFAULT_THEME,
};

import styled, { css } from 'styled-components';

import { INPUT_PADDING } from '../constants';
import { TYPOGRAPHY } from '../../../Typography';
import { DEFAULT_THEME } from '../../../common';
import type { Size } from '../../common';
import { getMaskLineHeight } from '../utils';
export interface IPlaceholderProps {
  size: Size;
  disabled?: boolean;
  focused?: boolean;
}

export const StyledPlaceHolder = styled.div<IPlaceholderProps>`
  ${({ disabled, focused, theme, size }) => css`
    position: absolute;
    box-sizing: content-box;
    padding-left: ${INPUT_PADDING}px;
    font-feature-settings: 'tnum' on, 'lnum' on, 'cv03' on, 'cv04' on;
    font-family: ${TYPOGRAPHY.fontFamily};
    font-size: ${size === 'micro' ? TYPOGRAPHY.fontSize[14] : TYPOGRAPHY.fontSize[16]};
    font-weight: ${TYPOGRAPHY.fontWeight.regular};
    margin-top: ${getMaskLineHeight(size)}px;
    border: transparent;
    font-stretch: normal;
    font-style: normal;
    white-space: pre;
    display: flex;
    justify-content: center;
    align-items: unset;
    font-optical-sizing: auto;
    color: ${disabled ? theme.color.neutral[10] : theme.color.neutral.white};
    &:hover {
      background-color: ${focused || disabled ? 'none' : theme.color.neutral[5]};
    }
    pointer-events: none;
    user-select: none;
    text-align: left;
  `}
`;

StyledPlaceHolder.defaultProps = {
  theme: DEFAULT_THEME,
};

import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { getTextColor } from './utils-style';
import type { ITextareaWrapperProps } from './interfaces';

export const TextareaWrapper = styled.div<ITextareaWrapperProps>`
  ${({ theme, $focused, $width, disabled }) => css`
    color: ${getTextColor(theme, $focused, disabled)};
    width: ${typeof $width === 'number' ? `${$width}px` : $width};
  `}
`;

TextareaWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

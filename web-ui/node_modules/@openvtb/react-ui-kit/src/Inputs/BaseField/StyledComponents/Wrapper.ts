import styled, { css } from 'styled-components';

import { getTextColor } from '../utils-style';
import { DEFAULT_THEME } from '../../../common';

export interface IWrapperProps {
  focused: boolean;
  disabled?: boolean;
  width?: string | number;
}

export const Wrapper = styled.div<IWrapperProps>`
  ${({ theme, focused, disabled, width }) => css`
    position: relative;
    color: ${getTextColor(focused, disabled, theme)};
    width: ${typeof width === 'number' ? `${width}px` : width};
  `}
`;

Wrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

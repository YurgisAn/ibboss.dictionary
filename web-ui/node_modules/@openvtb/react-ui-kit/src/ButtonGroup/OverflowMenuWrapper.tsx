import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { SIZE } from './ButtonGroupComponent';
import type { Size } from './ButtonGroupComponent';

interface IOverflowMenuWrapperProps {
  size: Size;
}

export const OverflowMenuWrapper = styled.div<IOverflowMenuWrapperProps>`
  ${({ size, theme }) => css`
    align-items: center;
    border-radius: ${theme.borderRadius};
    display: flex;
    justify-content: center;
    height: ${SIZE[size]}px;
    width: ${SIZE[size]}px;
  `};
`;

OverflowMenuWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

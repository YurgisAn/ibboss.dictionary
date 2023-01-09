import styled, { css } from 'styled-components';

import type { Size } from '../../common';
import { DEFAULT_THEME } from '../../../common';
import { OPTION_SIZE, OPTION_HORIZONTAL_PADDING } from '../constants';

export interface IOptionWrapperProps {
  size: Size;
}

export const OptionWrapper = styled.div<IOptionWrapperProps>`
  ${({ size, theme }) => css`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0px ${OPTION_HORIZONTAL_PADDING}px;
    height: ${OPTION_SIZE[size]}px;
    background-color: ${theme.color.neutral.white};
    color: ${theme.color.neutral[90]};
    &:hover {
      color: ${theme.color.primary[60]};
      background-color: ${theme.color.neutral[5]};
    }
    & > div {
      overflow: hidden;
    }
  `};
`;

OptionWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

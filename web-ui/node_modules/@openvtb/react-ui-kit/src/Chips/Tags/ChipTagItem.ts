import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';
import { MAX_WIDTH, HEIGHT_BIG, HEIGHT_SMALL, SHAPE_MICRO } from '../common/constants';

export interface IChipTagProps {
  size: Size;
  disabled?: boolean;
}

export type Size = 'big' | 'small';

export const ChipTagItem = styled.div<IChipTagProps>`
  ${({ disabled, size, theme: { color } }) => css`
    position: relative;
    box-sizing: border-box;
    max-width: ${MAX_WIDTH};
    color: ${disabled ? color.neutral[30] : color.neutral[90]};
    background-color: ${color.neutral[10]};
    border-radius: ${SHAPE_MICRO};
    height: ${size === 'big' ? HEIGHT_BIG : HEIGHT_SMALL};
    & svg {
      cursor: ${disabled ? 'default' : 'pointer'};
      fill: ${disabled ? color.neutral[30] : color.neutral[50]};
    }
  `}
  display: flex;
  align-items: center;
`;

ChipTagItem.defaultProps = {
  theme: DEFAULT_THEME,
};

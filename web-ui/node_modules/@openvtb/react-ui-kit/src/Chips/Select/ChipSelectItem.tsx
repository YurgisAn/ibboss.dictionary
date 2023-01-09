import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';
import { HEIGHT_BIG, HEIGHT_SMALL, MAX_WIDTH, SHAPE_MICRO } from '../common/constants';
import type { Size } from '../Tags/ChipTagItem';

import {
  getChipColor,
  getChipBackgroundColor,
  getChipHoverColor,
  getChipHoverBackgroundColor,
} from './styleUtils';

export interface IChipSelectItemProps {
  size: Size;
  disabled?: boolean;
  selected?: boolean;
  focused?: boolean;
}

export const ChipSelectItem = styled.div<IChipSelectItemProps>`
  ${({ theme, disabled, size, selected }) => css`
    display: flex;
    align-items: center;
    position: relative;
    cursor: ${disabled ? 'default' : 'pointer'};
    padding-left: 8px;
    padding-right: 8px;
    max-width: ${MAX_WIDTH};
    color: ${getChipColor(theme, disabled, selected)};
    background-color: ${getChipBackgroundColor(theme, disabled, selected)};
    border-radius: ${SHAPE_MICRO};
    height: ${size === 'big' ? HEIGHT_BIG : HEIGHT_SMALL};
    ${disabled
      ? ''
      : css`
          &:hover {
            color: ${getChipHoverColor(theme, selected)};
            background-color: ${getChipHoverBackgroundColor(theme, selected)};
          }
        `}
    &:focus {
      outline: none;
      ${disabled ? '' : `border: 2px solid ${theme.color.primary[60]};`}
    }
  `}
`;

ChipSelectItem.defaultProps = {
  theme: DEFAULT_THEME,
};

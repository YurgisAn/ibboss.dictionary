import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';
import { HEIGHT_BIG, HEIGHT_SMALL, MARGIN_LEFT_BIG, MARGIN_LEFT_SMALL } from '../common/constants';

import type { IChipTagProps } from './ChipTagItem';

export const CloseIconContainer = styled.div<IChipTagProps>`
  ${({ disabled, size, theme: { color } }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${size === 'big' ? HEIGHT_BIG : HEIGHT_SMALL};
    width: ${size === 'big' ? HEIGHT_BIG : HEIGHT_SMALL};
    border-radius: 50%;
    margin-left: ${size === 'big' ? MARGIN_LEFT_BIG : MARGIN_LEFT_SMALL};
    &:hover {
      background-color: ${disabled ? 'none' : color.opacity.blackHover};
      outline: none;
      cursor: ${!disabled ? 'pointer' : 'default'};
    }
    &:focus {
      outline: none;
      border: none;
      background-color: ${disabled ? 'none' : color.opacity.blackFocus};
    }
    &:active {
      outline: none;
      border: none;
      background-color: ${disabled ? 'none' : color.opacity.blackPressed};
    }
  `};
`;

CloseIconContainer.defaultProps = {
  theme: DEFAULT_THEME,
};

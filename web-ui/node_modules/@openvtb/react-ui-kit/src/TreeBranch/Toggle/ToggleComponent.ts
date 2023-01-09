import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';
import type { Size } from '../TreeBranchComponent';

const BEFORE_OFFSET = -5;
const MARGIN_RIGHT = 16;

const SIZE = {
  big: 24,
  small: 20,
};

interface IToggleComponentProps {
  size: Size;
}

export const ToggleComponent = styled.div<IToggleComponentProps>`
  ${({ size, theme }) => css`
    align-items: center;
    cursor: pointer;
    display: flex;
    height: ${SIZE[size]}px;
    justify-content: center;
    margin-right: ${MARGIN_RIGHT}px;
    outline: none;
    position: relative;
    width: ${SIZE[size]}px;

    &::before {
      border-radius: 50%;
      bottom: ${BEFORE_OFFSET}px;
      content: '';
      left: ${BEFORE_OFFSET}px;
      position: absolute;
      right: ${BEFORE_OFFSET}px;
      top: ${BEFORE_OFFSET}px;
    }

    &:focus {
      &::before {
        background-color: ${theme.color.opacity.blackFocus};
      }
    }

    &:hover {
      &::before {
        background-color: ${theme.color.opacity.blackHover};
      }
    }

    &:active {
      &::before {
        background-color: ${theme.color.opacity.blackPressed};
      }
    }

    & svg {
      fill: ${theme.color.neutral[50]};
    }
  `};
`;

ToggleComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

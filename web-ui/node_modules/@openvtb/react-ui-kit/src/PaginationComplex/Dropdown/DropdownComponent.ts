import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';

export const HEIGHT = 40;
export const PADDING_HORIZONTAL = 12;

const WIDTH = 68;

interface IDropdownComponentProps {
  disabled: boolean;
  opened: boolean;
}

export const DropdownComponent = styled.button<IDropdownComponentProps>`
  ${({ disabled, opened, theme: { color } }) => css`
    align-items: center;
    background: transparent;
    border: none;
    color: ${color.neutral[90]};
    cursor: pointer;
    display: flex;
    height: ${HEIGHT}px;
    justify-content: space-between;
    outline: none;
    padding: 0 ${PADDING_HORIZONTAL}px;
    position: relative;
    width: ${WIDTH}px;

    & div svg {
      fill: ${opened ? color.primary[60] : color.neutral[50]};
    }

    ${opened &&
    css`
      &::before {
        background: ${color.primary[60]};
        bottom: 0;
        content: '';
        height: 2px;
        left: 0;
        position: absolute;
        width: 100%;
      }
    `}

    &:hover {
      ${!disabled &&
      !opened &&
      css`
        &::before {
          background: ${color.neutral[20]};
          bottom: 0;
          content: '';
          height: 2px;
          left: 0;
          position: absolute;
          width: 100%;
        }

        & div svg {
          fill: ${color.primary[60]};
        }
      `}
    }

    &:focus {
      &::after {
        border: 2px solid ${color.primary[60]};
        bottom: 0;
        content: '';
        display: block;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    &:disabled {
      border: none;
      color: ${color.neutral[30]};
      cursor: default;

      & div svg {
        fill: ${color.neutral[30]};
      }
    }
  `};
`;

DropdownComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

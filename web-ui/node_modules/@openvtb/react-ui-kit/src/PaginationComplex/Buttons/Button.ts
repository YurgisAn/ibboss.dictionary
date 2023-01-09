import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';

const SIZE = 40;

export const Button = styled.button`
  ${({ theme }) => css`
    align-items: center;
    background: ${theme.color.neutral[10]};
    border-radius: ${theme.borderRadius};
    border: none;
    cursor: pointer;
    display: flex;
    height: ${SIZE}px;
    justify-content: center;
    outline: none;
    width: ${SIZE}px;

    & svg {
      fill: ${theme.color.neutral[50]};
    }

    &:focus {
      border: 2px solid ${theme.color.primary[60]};
    }

    &:hover {
      background: ${theme.color.neutral[20]};

      & svg {
        fill: ${theme.color.primary[60]};
      }
    }

    &:active {
      background: ${theme.color.neutral[30]};

      & div svg {
        fill: ${theme.color.primary[60]};
      }
    }

    &:disabled {
      background: ${theme.color.neutral[10]};
      cursor: default;

      & svg {
        fill: ${theme.color.neutral[30]};
      }
    }
  `};
`;

Button.defaultProps = {
  theme: DEFAULT_THEME,
};

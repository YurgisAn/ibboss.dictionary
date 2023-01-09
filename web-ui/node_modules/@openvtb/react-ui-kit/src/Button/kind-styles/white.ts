import { css } from 'styled-components';

import type { ITheme } from '../../themes';

export const white = (theme: ITheme) => css`
  background-color: transparent;
  border-color: ${theme.color.neutral.white};
  color: ${theme.color.neutral.white};

  & div svg {
    fill: ${theme.color.neutral.white};
  }
  &:focus {
    &::after {
      border-color: ${theme.color.neutral.white};
    }
  }

  &:hover {
    background-color: ${theme.color.opacity.whiteHover};
    border-color: ${theme.color.neutral.white};
    color: ${theme.color.neutral.white};

    & div svg {
      fill: ${theme.color.neutral.white};
    }
  }

  &:active {
    background-color: ${theme.color.opacity.whitePressed};
    border-color: ${theme.color.neutral.white};
    color: ${theme.color.neutral.white};

    & div svg {
      fill: ${theme.color.neutral.white};
    }
  }

  &:disabled {
    background-color: transparent;
    border-color: ${theme.color.neutral[50]};
    color: ${theme.color.neutral[50]};

    & div svg {
      fill: ${theme.color.neutral[50]};
    }
  }
`;

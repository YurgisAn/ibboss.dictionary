import { css } from 'styled-components';

import type { ITheme } from '../../themes';

export const secondary = (theme: ITheme) => css`
  background-color: transparent;
  border-color: ${theme.color.primary[60]};
  color: ${theme.color.primary[60]};

  & div svg {
    fill: ${theme.color.primary[60]};
  }

  &:focus {
    &::after {
      border-color: ${theme.color.primary[60]};
    }
  }

  &:hover {
    background-color: ${theme.color.opacity.blackHover};
    border-color: ${theme.color.primary[60]};
    color: ${theme.color.primary[60]};

    & div svg {
      fill: ${theme.color.primary[60]};
    }
  }

  &:active {
    background-color: ${theme.color.opacity.blackPressed};
    border-color: ${theme.color.primary[60]};
    color: ${theme.color.primary[60]};

    & div svg {
      fill: ${theme.color.primary[60]};
    }
  }

  &:disabled {
    background-color: transparent;
    border-color: ${theme.color.neutral[30]};
    color: ${theme.color.neutral[30]};

    & div svg {
      fill: ${theme.color.neutral[30]};
    }
  }
`;

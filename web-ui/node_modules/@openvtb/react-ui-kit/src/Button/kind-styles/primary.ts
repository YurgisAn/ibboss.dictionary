import { css } from 'styled-components';

import type { ITheme } from '../../themes';

export const primary = (theme: ITheme) => css`
  background-color: ${theme.color.primary[60]};
  border-color: ${theme.color.primary[60]};
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
    background-color: ${theme.color.primary[70]};
    border-color: ${theme.color.primary[70]};
  }

  &:active {
    background-color: ${theme.color.primary[80]};
    border-color: ${theme.color.primary[80]};
  }

  &:disabled {
    background-color: ${theme.color.neutral[10]};
    border-color: ${theme.color.neutral[10]};
    color: ${theme.color.neutral[30]};

    & div svg {
      fill: ${theme.color.neutral[30]};
    }
  }
`;

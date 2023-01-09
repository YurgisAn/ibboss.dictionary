import { css } from 'styled-components';

import type { ITheme } from '../../themes';

export const success = (theme: ITheme) => css`
  background-color: ${theme.color.success[50]};
  border-color: ${theme.color.success[50]};
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
    background-color: ${theme.color.success[60]};
    border-color: ${theme.color.success[60]};
  }

  &:active {
    background-color: ${theme.color.success[70]};
    border-color: ${theme.color.success[70]};
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

import { css } from 'styled-components';

import type { ITheme } from '../../themes';

export const ghost = (theme: ITheme) => css`
  background-color: transparent;
  border-color: transparent;
  color: ${theme.color.primary[60]};

  & div svg {
    fill: ${theme.color.primary[60]};
  }

  &:focus {
    border-color: ${theme.color.primary[60]};

    &::after {
      border-color: transparent;
    }
  }

  &:hover {
    background-clip: padding-box;
    background-color: ${theme.color.opacity.blackHover};
    border-color: ${theme.color.opacity.blackHover};
  }

  &:active {
    background-clip: padding-box;
    background-color: ${theme.color.opacity.blackPressed};
    border-color: ${theme.color.opacity.blackPressed};
  }

  &:disabled {
    background-color: transparent;
    border-color: transparent;
    color: ${theme.color.neutral[30]};

    & div svg {
      fill: ${theme.color.neutral[30]};
    }
  }
`;

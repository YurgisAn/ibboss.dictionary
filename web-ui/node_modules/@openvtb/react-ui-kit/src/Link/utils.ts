import type { ITheme } from '../themes';

import type { LinkKind } from './constants';

export const getColors = (theme: ITheme, kind: LinkKind, inverse: boolean) => {
  if (inverse) {
    const inverseColor = theme.color.primary[40];
    return {
      color: inverseColor,
      fill: inverseColor,
      hover: {
        color: inverseColor,
        fill: inverseColor,
      },
      focus: {
        color: inverseColor,
        fill: inverseColor,
      },
    };
  }
  switch (kind) {
    case 'primary':
      return {
        color: theme.color.primary[60],
        fill: theme.color.primary[60],
        hover: {
          color: theme.color.primary[70],
          fill: theme.color.primary[70],
        },
        focus: {
          color: theme.color.primary[60],
          fill: theme.color.primary[60],
        },
      };
    case 'secondary':
      return {
        color: theme.color.neutral[90],
        fill: theme.color.neutral[50],
        hover: {
          color: theme.color.primary[60],
          fill: theme.color.primary[60],
        },
        focus: {
          color: theme.color.neutral[90],
          fill: theme.color.neutral[50],
        },
      };
  }
};

import type { ITheme } from '../themes';

import { Kind } from './Button';

export const getBackgroundColor = (kind: Kind, color: ITheme['color']) => {
  switch (kind) {
    case 'grey':
      return color.neutral[10];
    case 'blue':
      return color.primary[20];
    case 'orange':
      return color.warning[20];
    case 'red':
      return color.error[20];
    case 'green':
      return color.success[20];
    default:
      return 'grey';
  }
};

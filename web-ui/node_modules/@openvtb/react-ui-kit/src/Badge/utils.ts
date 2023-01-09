import type { ITheme } from '../themes';

import type { Kind } from './BadgeComponent';

export const getBackgroundColor = (kind: Kind, theme: ITheme) => {
  switch (kind) {
    case 'info':
      return theme.color.primary[60];
    case 'success':
      return theme.color.success[50];
    case 'warning':
      return theme.color.warning[50];
    case 'error':
      return theme.color.error[60];
    case 'neutral-grey':
      return theme.color.neutral[50];
    case 'neutral-dark':
      return theme.color.neutral[80];
    case 'neutral-light':
    case 'neutral-light-disabled':
    case 'neutral-light-inactive':
      return theme.color.neutral[10];
    case 'neutral-white':
    case 'neutral-white-disabled':
    case 'neutral-white-inactive':
      return theme.color.neutral.white;
  }
};

export const getTextColor = (kind: Kind, theme: ITheme) => {
  switch (kind) {
    case 'neutral-light':
    case 'neutral-white':
      return theme.color.neutral[90];
    case 'neutral-light-disabled':
    case 'neutral-white-disabled':
      return theme.color.neutral[30];
    case 'neutral-light-inactive':
    case 'neutral-white-inactive':
      return theme.color.neutral[50];
    case 'success':
    case 'info':
    case 'warning':
    case 'error':
    case 'neutral-grey':
    case 'neutral-dark':
      return theme.color.neutral.white;
  }
};

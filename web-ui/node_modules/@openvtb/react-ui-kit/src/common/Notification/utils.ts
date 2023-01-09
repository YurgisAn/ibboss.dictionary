import type { ITheme } from '../../themes';

import { NotificationKind } from './NotificationComponent';
import { TRANSFORM_SCALE } from './constants';

export const getColor = (kind: NotificationKind, theme: ITheme) => {
  switch (kind) {
    case 'warning':
      return theme.color.warning[50];
    case 'success':
      return theme.color.success[50];
    case 'error':
      return theme.color.error[60];
    case 'info':
    default:
      return theme.color.primary[60];
  }
};

export const getInverseColor = (kind: NotificationKind, theme: ITheme) => {
  switch (kind) {
    case 'warning':
      return theme.color.warning[50];
    case 'success':
      return theme.color.success[40];
    case 'error':
      return theme.color.error[50];
    case 'info':
    default:
      return theme.color.primary[50];
  }
};

export const getBackgroundColor = (kind: NotificationKind, theme: ITheme) => {
  switch (kind) {
    case 'warning':
      return theme.color.warning[10];
    case 'success':
      return theme.color.success[10];
    case 'error':
      return theme.color.error[10];
    case 'info':
    default:
      return theme.color.primary[10];
  }
};

export const getTransitionStyles = (duration: number) => ({
  entered: {
    opacity: 1,
  },
  entering: {
    opacity: 1,
    transform: 'translateX(0)',
    transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms`,
  },
  exited: {
    opacity: 0,
  },
  exiting: {
    opacity: 0,
    transform: `scale(${TRANSFORM_SCALE})`,
    transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms`,
  },
});

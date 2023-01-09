import type { ITheme } from '../themes';

import { StepState } from './StepComponent';
import { ICON_CONTENT_MARGIN } from './constants';

export interface IStepColors {
  line: string;
  icon: string;
  text: string;
  iconText: string;
}

export const getColors = (theme: ITheme, stepState: StepState, disabled?: boolean): IStepColors => {
  if (disabled) {
    return {
      line: theme.color.neutral[20],
      icon: theme.color.neutral[10],
      text: theme.color.neutral[30],
      iconText: theme.color.neutral[30],
    };
  }
  switch (stepState) {
    case 'current':
    case 'completed':
    default:
      return {
        line: theme.color.primary[60],
        icon: theme.color.primary[60],
        text: theme.color.neutral[90],
        iconText: theme.color.neutral.white,
      };
    case 'next':
      return {
        line: theme.color.neutral[20],
        icon: theme.color.neutral[10],
        text: theme.color.neutral[90],
        iconText: theme.color.neutral[90],
      };
    case 'error':
      return {
        line: theme.color.error[60],
        icon: theme.color.error[60],
        text: theme.color.neutral[90],
        iconText: theme.color.neutral.white,
      };
  }
};

export const getMargin = (stepState: StepState) =>
  stepState === 'completed' || stepState === 'error' ? ICON_CONTENT_MARGIN : 0;

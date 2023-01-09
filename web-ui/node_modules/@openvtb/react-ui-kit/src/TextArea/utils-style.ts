import type { ITheme } from '../themes';

import {
  Status,
  BORDER_TYPE,
  TEXTAREA_PADDING,
  TEXTAREA_PADDING_ACTIVE,
  TEXTAREA_SIZE,
  TEXTAREA_PADDING_ANOTHER_THEME,
} from './constants';

export const getTextareaHeight = (theme: ITheme) =>
  `${TEXTAREA_SIZE + parseInt(theme.borderRadius)}px`;

export const getBorderBottom = (
  theme: ITheme,
  status: Status,
  focused?: boolean,
  disabled?: boolean,
  readOnly?: boolean
) => {
  if (theme.input.borderWidthActive) {
    return `${focused ? theme.input.borderWidthActive : theme.input.borderWidth}px
    ${BORDER_TYPE} ${getBorderColorInput(theme, status, focused, disabled, readOnly)}`;
  } else {
    return `${readOnly || (!focused && status === 'default') ? '1px' : '2px'}
        ${BORDER_TYPE} ${getBorderColorInput(theme, status, focused, disabled, readOnly)}`;
  }
};

export const getTextareaPadding = (
  status: Status,
  focused?: boolean,
  readOnly?: boolean,
  theme?: ITheme
) => {
  if (theme?.input.borderWidthActive && focused) {
    return TEXTAREA_PADDING_ANOTHER_THEME;
  } else {
    return readOnly || (!focused && status === 'default')
      ? TEXTAREA_PADDING
      : TEXTAREA_PADDING_ACTIVE;
  }
};

export const getLabelColorByStatus = (theme: ITheme, status: Status, defaultValue = 'inherit') => {
  switch (status) {
    case 'error':
      return theme.color.error[60];
    case 'success':
      return theme.color.success[50];
    default:
      return defaultValue;
  }
};

export const getBorderColorInput = (
  theme: ITheme,
  status: Status,
  focused?: boolean,
  disabled?: boolean,
  readOnly?: boolean
) => {
  if (disabled || readOnly) return theme.color.neutral[10];

  if (status === 'success') return theme.color.success[50];

  if (status === 'error') return theme.color.error[60];

  if (status === 'default' && focused) return theme.color.primary[60];

  return theme.color.neutral[20];
};

export const getTextColor = (theme: ITheme, focused?: boolean, disabled?: boolean) => {
  if (disabled) return theme.color.neutral[30];

  if (focused) return theme.color.neutral[90];

  return theme.color.neutral[50];
};

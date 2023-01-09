import type { ITheme } from '../../themes';
import {
  INPUT_SIZE_BIG,
  INPUT_SIZE_MICRO,
  INPUT_SIZE_SMALL,
  SUFFIX_PADDING_BIG,
  SUFFIX_PADDING_SMALL,
  SUFFIX_PADDING_MICRO,
  COINS_PADDING_BIG,
  COINS_PADDING_SMALL,
  COINS_PADDING_MICRO,
} from '../constants';
import type { Status, Size } from '../common';

export const getAdditionalTextColor = (
  status: Status,
  theme: ITheme,
  disabled = false,
  focused = false
) => {
  if (status === 'error') return theme.color.error[60];

  if (status === 'success') return theme.color.success[50];

  return getTextColor(focused, disabled, theme);
};

export const getBorderColor = (
  status: Status,
  focused = false,
  disabled = false,
  theme: ITheme
) => {
  if (disabled) return theme.color.neutral[10];

  if (status === 'success' && !focused) return theme.color.success[50];

  if (status === 'error') return theme.color.error[60];

  if (status === 'default' && focused) return theme.color.primary[60];

  return theme.color.neutral[40];
};

export const getTextColor = (focused: boolean, disabled = false, theme: ITheme) => {
  if (disabled) return theme.color.neutral[30];

  if (focused) return theme.color.neutral[90];

  return theme.color.neutral[50];
};

export const getInputSize = (size: Size) => {
  switch (size) {
    case 'big':
      return INPUT_SIZE_BIG;
    case 'small':
      return INPUT_SIZE_SMALL;
    case 'micro':
      return INPUT_SIZE_MICRO;
  }
};

export const getSuffixPadding = (size: Size) => {
  switch (size) {
    case 'big':
      return SUFFIX_PADDING_BIG;
    case 'small':
      return SUFFIX_PADDING_SMALL;
    case 'micro':
      return SUFFIX_PADDING_MICRO;
  }
};

export const getCoinsPadding = (size: Size) => {
  switch (size) {
    case 'big':
      return COINS_PADDING_BIG;
    case 'small':
      return COINS_PADDING_SMALL;
    case 'micro':
      return COINS_PADDING_MICRO;
  }
};

export const getBorderRadius = (theme: ITheme, range = false) => {
  if (range) {
    return `${theme.input.borderRadius}px ${theme.input.borderRadius}px 0 0 `;
  }
  return `${theme.input.borderRadius}px`;
};

export const getBorder = (theme: ITheme, disabled = false, focused: boolean, status: Status) => {
  return `${focused ? theme.input.borderWidthActive : theme.input.borderWidth}px solid ${
    disabled ? 'transparent' : getBorderColor(status, focused, disabled, theme)
  }`;
};

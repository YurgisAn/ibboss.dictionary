export type ModalSize = 'big' | 'medium' | 'small' | 'micro';

export const SIZES_WIDTH: { [key in ModalSize]: number } = {
  big: 800,
  medium: 592,
  small: 488,
  micro: 384,
};

export const SIZES_HEIGHT: { [key in ModalSize]: number } = {
  big: 84,
  medium: 72,
  small: 56,
  micro: 48,
};

export const PADDING_LEFT = '24px';
export const PADDING_TOP = '20px';
export const PADDING_RIGHT = '16px';
export const MOBILE_PADDING_LEFT = '16px';
export const MOBILE_PADDING_TOP = '24px';
export const MOBILE_PADDING_RIGHT = '8px';
export const SCROLL_PADDING_RIGHT = '8px';
export const HEADER_MARGIN_BOTTOM = '16px';
export const CONTENT_MARGIN_BOTTOM = '24px';
export const BUTTONS_PADDING_BOTTOM = '24px';
export const BUTTONS_MARGIN_BETWEEN = '16px';
export const BUTTONS_HEIGHT = '40px';

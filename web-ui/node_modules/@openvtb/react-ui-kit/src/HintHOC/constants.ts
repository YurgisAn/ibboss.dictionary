export type Align = 'left' | 'center' | 'right';
export type Direction = 'bottom' | 'top';
export type Size = 'big' | 'medium' | 'small';

export const SIZES: { [key in Size]: number } = {
  big: 488,
  medium: 384,
  small: 280,
};

export const POINTER_HEIGHT = 8;
export const POINTER_MARGIN = 18;
export const POINTER_WIDTH = 16;

export const SAFE_SPACE = 16;

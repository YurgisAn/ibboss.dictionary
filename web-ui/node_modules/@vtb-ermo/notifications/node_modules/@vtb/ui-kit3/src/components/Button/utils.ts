export type Appearance = 'primary' | 'secondary' | 'ghost' | 'white' | 'danger' | 'success';
export type Dimension = 'xl' | 'l' | 'm' | 's';

export const BORDER_RADIUS = 4;
export const BORDER_WIDTH = 2;
export const BUTTON_SIZE = {
  xl: 56,
  l: 48,
  m: 40,
  s: 32,
} as Record<Dimension, number>;

export const paddingHorizontal = {
  xl: 32,
  l: 24,
  m: 20,
  s: 16,
};

import type { ITheme } from '../themes';

import type { Size } from './ButtonComponent';

const BORDER_WIDTH = 1;
const PADDING_COMPENSATION = 2;

export const BUTTON_SIZE = {
  big: 56,
  medium: 48,
  small: 40,
  micro: 32,
};

export const calculatePadding = ({
  multipleChildren,
  rightIcon,
  size,
  theme: {
    button: { paddingHorizontal },
  },
}: {
  multipleChildren: boolean;
  rightIcon: boolean;
  size: Size;
  theme: ITheme;
}) => {
  const padding = paddingHorizontal[size] - BORDER_WIDTH;

  if (!multipleChildren) return `0 ${padding}px`;

  const left = padding - (rightIcon ? 0 : PADDING_COMPENSATION);
  const right = padding - (rightIcon ? PADDING_COMPENSATION : 0);

  return `0 ${right}px 0 ${left}px`;
};

export const getWidth = ({
  fullWidth,
  onlyIcon,
  size,
}: {
  fullWidth: boolean;
  onlyIcon: boolean;
  size: Size;
}) => {
  if (onlyIcon) return `${BUTTON_SIZE[size]}px`;
  if (fullWidth) return '100%';
  return 'auto';
};

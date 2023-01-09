import { ICON_SIZE_DEFAULT, ICON_SIZE_MICRO } from '../../constants';

import type { Size } from './../types';

/**
 * Возвращает размер иконки
 * @param {Size} size - Размер инпута.
 * @return {20 | 24 } - Размер иконки
 */

export const getIconSize = (size: Size): 20 | 24 => {
  return 'micro' === size ? ICON_SIZE_MICRO : ICON_SIZE_DEFAULT;
};

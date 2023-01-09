import {
  MASK_LINE_HEIGHT_MICRO,
  MASK_LINE_HEIGHT_BIG,
  MASK_LINE_HEIGHT_SMALL,
  INPUT_MARGIN_TOP_BIG,
  INPUT_MARGIN_TOP_MICRO,
  INPUT_MARGIN_TOP_SMALL,
} from '../constants';
import type { Size } from '../../common';

export const getMaskLineHeight = (size: Size) => {
  switch (size) {
    case 'micro':
      return MASK_LINE_HEIGHT_MICRO;
    case 'small':
      return MASK_LINE_HEIGHT_SMALL;
    default:
      return MASK_LINE_HEIGHT_BIG;
  }
};

export const getInputMarginTop = (size: Size) => {
  switch (size) {
    case 'micro':
      return INPUT_MARGIN_TOP_MICRO;
    case 'small':
      return INPUT_MARGIN_TOP_SMALL;
    default:
      return INPUT_MARGIN_TOP_BIG;
  }
};

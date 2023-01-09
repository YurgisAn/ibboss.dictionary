import { TYPOGRAPHY } from '../Typography';

import {
  PADDING_TOP,
  MOBILE_PADDING_TOP,
  HEADER_MARGIN_BOTTOM,
  CONTENT_MARGIN_BOTTOM,
  BUTTONS_PADDING_BOTTOM,
  BUTTONS_HEIGHT,
} from './constants';

export const calcContentHeight = (
  modalPercentHeight: number,
  buttonCount: number,
  isMobile?: boolean
) => {
  if (!isMobile && buttonCount > 1) {
    buttonCount = 1; // to calculate footer height in common manner
  }
  const topPadding = isMobile ? MOBILE_PADDING_TOP : PADDING_TOP;
  const headerHeight = TYPOGRAPHY.lineHeight[24];
  const footerHeight =
    buttonCount > 0 ? `${buttonCount} * (${BUTTONS_HEIGHT} + ${BUTTONS_PADDING_BOTTOM})` : '0px';
  return `calc(${modalPercentHeight}vh - (${topPadding} 
    + ${headerHeight} + ${HEADER_MARGIN_BOTTOM} + ${CONTENT_MARGIN_BOTTOM} + ${footerHeight}))`;
};

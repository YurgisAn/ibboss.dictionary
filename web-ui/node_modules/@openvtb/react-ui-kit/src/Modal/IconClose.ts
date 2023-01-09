import styled from 'styled-components';

import { DEFAULT_THEME } from '../common';
import { MEDIA_MOBILE } from '../common/media';
import { markerStyle } from '../common/marker';

import {
  MOBILE_PADDING_TOP,
  MOBILE_PADDING_RIGHT,
  PADDING_TOP,
  SCROLL_PADDING_RIGHT,
  PADDING_RIGHT,
} from './constants';

export const IconClose = styled.div<{
  markerOffset: number;
  inverse?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${PADDING_TOP};
  right: calc(${PADDING_RIGHT} + ${SCROLL_PADDING_RIGHT});

  @media ${MEDIA_MOBILE} {
    top: ${MOBILE_PADDING_TOP};
    right: calc(${MOBILE_PADDING_RIGHT} + ${SCROLL_PADDING_RIGHT});
  }

  &:hover {
    cursor: pointer;
  }

  ${({ theme, markerOffset, inverse }) => `
    & svg {
      fill: ${inverse ? theme.color.neutral.white : theme.color.neutral[50]};
    }
    ${markerStyle(theme, markerOffset, inverse)}
  }`}
`;

IconClose.defaultProps = {
  theme: DEFAULT_THEME,
};

import styled from 'styled-components';

import { MEDIA_MOBILE } from '../common/media';
import { getTextStyle } from '../Typography';

import { PADDING_RIGHT, MOBILE_PADDING_RIGHT, CONTENT_MARGIN_BOTTOM } from './constants';

export const Content = styled.div`
  white-space: pre-wrap;
  overflow-y: auto;
  margin-bottom: ${CONTENT_MARGIN_BOTTOM};
  padding-right: ${PADDING_RIGHT};

  ${getTextStyle({ fontSize: 16, fontWeight: 'regular', lineHeight: 24 })}

  @media ${MEDIA_MOBILE} {
    padding-right: ${MOBILE_PADDING_RIGHT};

    ${getTextStyle({ fontSize: 14, fontWeight: 'regular', lineHeight: 20 })}
  }
`;

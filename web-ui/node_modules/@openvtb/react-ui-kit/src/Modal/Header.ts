import styled from 'styled-components';

import { MEDIA_MOBILE } from '../common/media';
import { getTextStyle } from '../Typography';

import { HEADER_MARGIN_BOTTOM } from './constants';

export const Header = styled.div`
  white-space: pre-wrap;
  margin-bottom: ${HEADER_MARGIN_BOTTOM};

  ${getTextStyle({ fontSize: 20, fontWeight: 'semibold', lineHeight: 24 })}

  @media ${MEDIA_MOBILE} {
    ${getTextStyle({ fontSize: 18, fontWeight: 'semibold', lineHeight: 24 })}
  }
`;

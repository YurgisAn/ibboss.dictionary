import styled from 'styled-components';

import { SIZES } from './constants';
import type { LinkSize } from './constants';

export const IconContainer = styled.div<{ size: LinkSize }>`
  display: inline-block;
  vertical-align: bottom;
  ${({ size }) => `
    width: ${SIZES[size]}px;
    height: ${SIZES[size]}px;
  `}
`;

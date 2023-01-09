import styled from 'styled-components';

import { PADDING_HORIZONTAL } from './Header';

const PADDING_TOP = 10;
const PADDING_TOP_SMALL = 6;

const PADDING_BOTTOM = 14;
const PADDING_BOTTOM_SMALL = 10;

export const Body = styled.div<{ small: boolean }>`
  padding: ${({ small }) => `
    ${small ? PADDING_TOP_SMALL : PADDING_TOP}px
    ${PADDING_HORIZONTAL}px
    ${small ? PADDING_BOTTOM_SMALL : PADDING_BOTTOM}px
  `};
`;

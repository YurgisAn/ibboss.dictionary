import styled from 'styled-components';

import { IN_SELECT_MARGIN_BIG, IN_SELECT_MARGIN_SMALL } from './constants';

export const Separator = styled.div<{ inSelect?: boolean }>`
  margin-left: ${({ inSelect }) => (inSelect ? IN_SELECT_MARGIN_SMALL : IN_SELECT_MARGIN_BIG)};
`;

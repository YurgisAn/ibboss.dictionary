import styled from 'styled-components';

import { YEAR_SIZES, YEAR_PADDINGS } from './constants';
import { Item } from './Item';

export const YearComponent = styled(Item)`
  ${({ size }) => `
    width: ${YEAR_SIZES[size]}px;
    padding: ${YEAR_PADDINGS[size]}px 0;
  `}
`;

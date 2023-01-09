import styled from 'styled-components';

import { Subtitle3 } from '../../Typography';

export const Header = styled(Subtitle3)<{ hasOffset?: boolean }>`
  ${({ hasOffset }) => (hasOffset ? 'margin-bottom: 4px;' : '')}
`;

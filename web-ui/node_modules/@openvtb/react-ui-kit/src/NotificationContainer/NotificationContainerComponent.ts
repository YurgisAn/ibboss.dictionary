import styled from 'styled-components';

import { Z_INDEXES } from '../common/z-indexes';

export type Position = 'top' | 'bottom';

export const NotificationContainerComponent = styled.div<{ position: Position }>`
  width: 100%;
  position: fixed;
  left: 0;
  ${({ position }) => position}: 0;
  z-index: ${Z_INDEXES.NOTIFICATION};
`;

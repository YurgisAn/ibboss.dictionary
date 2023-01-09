import styled from 'styled-components';

import { VALUE_CONTAINER_MARGIN_RIGHT } from '../constants';

export const ValueWrapper = styled.div`
  -webkit-overflow-scrolling: touch;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-wrap: nowrap;
  overflow: hidden;
  position: relative;
  margin-right: ${VALUE_CONTAINER_MARGIN_RIGHT};
  user-select: none;
`;

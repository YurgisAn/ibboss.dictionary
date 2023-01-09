import styled from 'styled-components';

import { Caption1 } from '../Typography';

import { STEP_HEIGHT } from './constants';

export const Caption = styled(Caption1)`
  min-width: ${STEP_HEIGHT}px;
  min-height: ${STEP_HEIGHT}px;
  max-width: ${STEP_HEIGHT}px;
  max-height: ${STEP_HEIGHT}px;
  border-radius: ${STEP_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

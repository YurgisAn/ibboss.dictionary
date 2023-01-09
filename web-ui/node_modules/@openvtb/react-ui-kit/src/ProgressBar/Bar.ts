import styled from 'styled-components';

import { DEFAULT_THEME } from '../common';

export const BORDER_RADIUS = 2;
const HEIGHT = 4;

export const Bar = styled.div`
  background: ${({ theme }) => theme.color.neutral[10]};
  border-radius: ${BORDER_RADIUS}px;
  height: ${HEIGHT}px;
  overflow: hidden;
`;

Bar.defaultProps = {
  theme: DEFAULT_THEME,
};

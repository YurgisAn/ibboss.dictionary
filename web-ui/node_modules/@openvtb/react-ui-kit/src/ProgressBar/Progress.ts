import styled from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { BORDER_RADIUS } from './Bar';

export const Progress = styled.div<{ error: boolean; value: number }>`
  background: ${({ error, theme }) => (error ? theme.color.error[60] : theme.color.primary[60])};
  border-radius: ${BORDER_RADIUS}px;
  height: 100%;
  width: ${({ value }) => value}%;
`;

Progress.defaultProps = {
  theme: DEFAULT_THEME,
};

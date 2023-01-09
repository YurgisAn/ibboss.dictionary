import styled from 'styled-components';

import { DEFAULT_THEME } from '../common';

const MARGIN_BOTTOM = 8;

export const Info = styled.div<{ error: boolean }>`
  color: ${({ error, theme }) => (error ? theme.color.error[60] : theme.color.neutral[90])};
  display: flex;
  justify-content: space-between;
  margin-bottom: ${MARGIN_BOTTOM}px;
`;

Info.defaultProps = {
  theme: DEFAULT_THEME,
};

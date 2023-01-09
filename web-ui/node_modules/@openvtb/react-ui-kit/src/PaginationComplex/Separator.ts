import styled from 'styled-components';

import { DEFAULT_THEME } from '../common';

export const Separator = styled.div`
  background: ${({ theme }) => theme.color.neutral[20]};
  height: 24px;
  width: 1px;
`;

Separator.defaultProps = {
  theme: DEFAULT_THEME,
};

import styled from 'styled-components';

import { DEFAULT_THEME } from '../../../common';

export const LabelWrapper = styled.div<{ load?: boolean }>`
  color: ${({ theme }) => theme.color.neutral[50]};
  padding-left: ${({ load }) => (load ? 13 : 0)}px;
`;

LabelWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

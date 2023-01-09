import styled from 'styled-components';

import { DEFAULT_THEME } from '../../../common';

export const SeparatorComponent = styled.div`
  display: flex;
  margin: 0 8px;
  user-select: none;

  & svg {
    fill: ${({ theme }) => theme.color.neutral[50]};
  }
`;

SeparatorComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';
import { Button } from '../Button';

export const DropdownButton = styled(Button)`
  border-radius: ${({ theme }) => `0 ${theme.borderRadius} ${theme.borderRadius} 0`};
  ${({ kind }) =>
    kind === 'secondary' &&
    css`
      border-left: none;
      padding-left: 1px;
    `}
`;

DropdownButton.defaultProps = {
  theme: DEFAULT_THEME,
};

import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';
import { Button } from '../Button';

export const MainButton = styled(Button)`
  ${({ kind, size = 'big', theme }) => css`
    border-radius: ${theme.borderRadius} 0 0 ${theme.borderRadius};
    position: relative;

    ${kind === 'secondary' &&
    css`
      border-right: none;
      padding-right: ${theme.button.paddingHorizontal[size]}px;
    `}
  `};
`;

MainButton.defaultProps = {
  theme: DEFAULT_THEME,
};

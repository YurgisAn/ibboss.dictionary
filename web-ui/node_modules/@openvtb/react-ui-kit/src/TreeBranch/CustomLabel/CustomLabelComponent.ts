import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';

export const CustomLabelComponent = styled.div`
  ${({ theme }) => css`
    align-items: center;
    color: ${theme.color.neutral[90]};
    display: flex;
    user-select: none;

    & svg {
      fill: ${theme.color.neutral[50]};
    }
  `};
`;

CustomLabelComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

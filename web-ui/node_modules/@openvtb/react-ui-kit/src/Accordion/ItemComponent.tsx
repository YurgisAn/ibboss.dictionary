import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';

export const ItemComponent = styled.li`
  ${({ theme }) => css`
    border-top: 1px solid ${theme.color.neutral[20]};
    color: ${theme.color.neutral[90]};
    display: flex;
    flex-direction: column;
    position: relative;

    &:last-child {
      border-bottom: 1px solid ${theme.color.neutral[20]};
    }
  `};
`;

ItemComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

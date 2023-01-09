import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../../common';

interface IItemComponentProps {
  focused: boolean;
  last: boolean;
}

export const ItemComponent = styled.div<IItemComponentProps>`
  color: ${({ focused, last, theme }) =>
    focused && !last ? theme.color.primary[60] : theme.color.neutral[50]};
  cursor: ${({ last }) => (last ? 'default' : 'pointer')};
  height: 100%;
  position: relative;
  white-space: nowrap;

  ${({ last }) =>
    !last &&
    css`
      &:hover {
        color: ${({ theme }) => theme.color.primary[60]};
      }
    `};

  ${({ focused, last }) =>
    focused &&
    !last &&
    css`
      &:after {
        background: ${({ theme }) => theme.color.primary[60]};
        bottom: -2px;
        content: '';
        height: 2px;
        position: absolute;
        width: 100%;
      }
    `};
`;

ItemComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

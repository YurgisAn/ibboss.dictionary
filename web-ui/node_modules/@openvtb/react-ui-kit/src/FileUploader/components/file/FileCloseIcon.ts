import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../../common';

export const FileCloseIcon = styled.div`
  ${({ theme }) => css`
    height: 20px;
    width: 20px;
    cursor: pointer;

    & svg {
      fill: ${theme.color.neutral[50]};
      height: 20px;
      width: 20px;
      transition: all 0.2s;

      &:hover {
        fill: ${theme.color.primary[60]};
      }
    }
  `}
`;

FileCloseIcon.defaultProps = {
  theme: DEFAULT_THEME,
};

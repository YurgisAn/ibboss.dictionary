import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../../common';

export const FileErrorIcon = styled.div`
  ${({ theme }) => css`
    height: 20px;
    width: 20px;
    & svg {
      fill: ${theme.color.error[60]};
      height: 20px;
      width: 20px;
    }
  `}
`;

FileErrorIcon.defaultProps = {
  theme: DEFAULT_THEME,
};

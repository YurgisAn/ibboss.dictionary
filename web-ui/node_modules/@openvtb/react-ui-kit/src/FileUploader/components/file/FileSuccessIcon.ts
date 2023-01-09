import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../../common';

export const FileSuccessIcon = styled.div`
  ${({ theme }) => css`
    height: 20px;
    width: 20px;
    & svg {
      fill: ${theme.color.success[50]};
      height: 20px;
      width: 20px;
    }
  `}
`;

FileSuccessIcon.defaultProps = {
  theme: DEFAULT_THEME,
};

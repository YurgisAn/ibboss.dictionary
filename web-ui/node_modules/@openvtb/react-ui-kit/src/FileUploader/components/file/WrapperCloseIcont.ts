import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../../common';

export const WrapperCloseIcon = styled.div`
  ${({ theme }) => css`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    &:hover {
      background: ${theme.color.opacity.blackHover};
    }
  `}
`;

WrapperCloseIcon.defaultProps = {
  theme: DEFAULT_THEME,
};

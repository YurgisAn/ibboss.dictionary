import styled from 'styled-components';

import { DEFAULT_THEME } from '../../../common';

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: ${({ theme }) => `${theme.input.iconPaddingRight}px`};
  &: svg {
    cursor: pointer;
  }
`;

IconWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

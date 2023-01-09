import styled from 'styled-components';

import { DEFAULT_THEME } from '../../../common';

export const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: ${({ theme }) => `${theme.input.iconPaddingRight}px`};
`;

IconWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

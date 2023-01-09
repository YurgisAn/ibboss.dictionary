import styled from 'styled-components';

import { DEFAULT_THEME } from '../../../common';

export const ColorText = styled.span`
  color: ${({ theme }) => theme.color.primary[60]};
`;

ColorText.defaultProps = {
  theme: DEFAULT_THEME,
};

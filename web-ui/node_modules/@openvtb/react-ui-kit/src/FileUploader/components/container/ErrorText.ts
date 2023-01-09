import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../../common';
import { Body2Short } from '../../../Typography';

export const ErrorText = styled(Body2Short)`
  ${({ theme }) => css`
    color: ${theme.color.error[60]};
    margin-top: 8px;
  `}
`;

ErrorText.defaultProps = {
  theme: DEFAULT_THEME,
};

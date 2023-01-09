import styled, { css } from 'styled-components';

import { Body2Short } from '../../../Typography';
import { DEFAULT_THEME } from '../../../common';

export const FileErrorText = styled(Body2Short)`
  ${({ theme }) => css`
    color: ${theme.color.error[60]};
    margin-top: 8px;
  `}
`;

FileErrorText.defaultProps = {
  theme: DEFAULT_THEME,
};

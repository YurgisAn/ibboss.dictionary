import styled, { css } from 'styled-components';

import { Body2Short } from '../Typography';
import { DEFAULT_THEME } from '../common';

import { ERROR_MESSAGE_WIDTH } from './constants';

export const ErrorMessage = styled(Body2Short)`
  ${({ theme }) => css`
    position: absolute;
    left: 0;
    width: ${ERROR_MESSAGE_WIDTH}px;
    color: ${theme.color.error[60]};
  `}
`;

ErrorMessage.defaultProps = {
  theme: DEFAULT_THEME,
};

import styled, { css } from 'styled-components';

import { Body2Short } from '../Typography';
import { DEFAULT_THEME } from '../common';

import { getLabelColorByStatus } from './utils-style';
import type { IThemeAndStatus } from './interfaces';

export const LimitLabel = styled(Body2Short)<IThemeAndStatus>`
  ${({ theme, $status = 'default' }) => css`
    position: absolute;
    right: 0;
    color: ${getLabelColorByStatus(theme, $status)};
  `}
`;

LimitLabel.defaultProps = {
  theme: DEFAULT_THEME,
};

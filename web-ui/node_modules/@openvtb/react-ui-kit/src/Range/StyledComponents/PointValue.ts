import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';

import { getTextColor } from './utils-style';

export interface IPointValueprops {
  disabled?: boolean;
}

export const PointValue = styled.div<IPointValueprops>`
  ${({ theme, disabled }) => css`
    display: flex;
    align-items: center;
    position: absolute;
    top: 13px;
    white-space: nowrap;
    ${getTextColor(theme, disabled)}
  `};
`;

PointValue.defaultProps = {
  theme: DEFAULT_THEME,
};

import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';

import { getValueStyle } from './utils-style';
import type { IValueProps } from './ValueStart';

export type IValueEnd = IValueProps;

export const ValueEnd = styled.div<IValueEnd>`
  ${({ theme, disabled, isRight }) => css`
    ${getValueStyle(theme, disabled, isRight)}
  `}
`;

ValueEnd.defaultProps = {
  theme: DEFAULT_THEME,
};

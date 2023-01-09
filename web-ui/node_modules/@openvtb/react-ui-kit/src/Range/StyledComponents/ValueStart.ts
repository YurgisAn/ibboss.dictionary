import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';

import { getValueStyle } from './utils-style';

export interface IValueProps {
  disabled?: boolean;
  isRight?: boolean;
}

export const ValueStart = styled.div<IValueProps>`
  ${({ theme, disabled, isRight }) => css`
    ${getValueStyle(theme, disabled, isRight)}
  `}
`;

ValueStart.defaultProps = {
  theme: DEFAULT_THEME,
};

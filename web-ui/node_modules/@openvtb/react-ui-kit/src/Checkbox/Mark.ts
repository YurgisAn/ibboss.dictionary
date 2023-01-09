import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { commonMarkStyle } from './style-utils';
import { CheckboxSize } from './constants';

interface IMarkProps {
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: CheckboxSize;
  withLabel?: boolean;
}

export const Mark = styled.div<IMarkProps>`
  ${({ theme, error, size, withLabel }) => css`
    ${commonMarkStyle(theme, size, false, withLabel)}
    background-color: ${theme.color.neutral.white};
    border: 1px solid ${error ? theme.color.error[60] : theme.color.neutral[50]};
    border-radius: ${theme.borderRadius};
  `}

  ${({ disabled, checked, theme }) =>
    disabled &&
    css`
      border: 1px solid ${theme.color.neutral[30]};
      background-color: ${checked ? theme.color.neutral[30] : theme.color.neutral.white};
    `}
`;

Mark.defaultProps = {
  theme: DEFAULT_THEME,
};

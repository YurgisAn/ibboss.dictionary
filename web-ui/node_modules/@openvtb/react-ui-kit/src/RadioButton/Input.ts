import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { Mark } from './Mark';
import { RadioScaleAnimation } from './style-utils';

export const Input = styled.input<{ disabled?: boolean }>`
  height: 0;
  position: absolute;
  width: 0;
  ${RadioScaleAnimation}

  &:focus {
    outline: none;
  }

  &:checked ~ ${Mark} {
    ${({ theme, disabled }) => css`
      border: 1px solid ${disabled ? theme.color.neutral[30] : theme.color.primary[60]};
    `}

    &:after {
      ${({ theme, disabled }) => css`
        border: 3px solid ${disabled ? theme.color.neutral[30] : theme.color.primary[60]};
      `};
    }
  }
`;

Input.defaultProps = {
  theme: DEFAULT_THEME,
};

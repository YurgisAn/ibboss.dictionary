import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { Mark } from './Mark';
import { checkOn } from './style-utils';

export interface IInputProps {
  disabled?: boolean;
}

export const Input = styled.input<IInputProps>`
  display: none;

  &:checked ~ ${Mark} {
    ${({ theme, disabled }) => css`
      border: 1px solid ${disabled ? theme.color.neutral[30] : theme.color.primary[60]};
      background-color: ${disabled ? theme.color.neutral[30] : theme.color.primary[60]};
    `}

    svg path {
      animation: ${checkOn} 0.6s ease-in-out backwards;
      stroke-dashoffset: 0;
    }
  }
`;

Input.defaultProps = {
  theme: DEFAULT_THEME,
};

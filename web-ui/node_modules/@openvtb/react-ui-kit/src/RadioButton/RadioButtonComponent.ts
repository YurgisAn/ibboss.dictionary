import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { Input } from './Input';
import { Mark } from './Mark';
import type { RadioButtonSize } from './constants';
import { RADIOBUTTON_MIN_HEIGHT_SMALL, RADIOBUTTON_MIN_HEIGT_BIG } from './constants';
import { commonRadioButtonComponentStyle } from './style-utils';

type RadioButtonComponentProps = {
  size: RadioButtonSize;
  error?: boolean;
  disabled?: boolean;
};

export const RadioButtonComponent = styled.div<RadioButtonComponentProps>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: flex-start;
  min-height: ${({ size }) =>
    size === 'small' ? RADIOBUTTON_MIN_HEIGHT_SMALL : RADIOBUTTON_MIN_HEIGT_BIG};

  ${({ error, theme }) =>
    error &&
    css`
      ${Mark} {
        border: 1px solid ${theme.color.error[60]};
      }
    `}

  ${({ theme, disabled }) => css`
    cursor: ${disabled ? 'default' : 'pointer'};
    ${Input}:checked ~ ${Mark} {
      border-color: ${disabled ? theme.color.neutral[30] : theme.color.primary[60]};
    }
    ${Mark} {
      border-color: ${disabled ? theme.color.neutral[30] : theme.color.neutral[50]};
    }
    &:hover {
      ${commonRadioButtonComponentStyle(theme, 'Hover', disabled)}
    }
    &:focus {
      outline: none;
      ${commonRadioButtonComponentStyle(theme, 'Focus', disabled)}
    }
    &:active {
      ${commonRadioButtonComponentStyle(theme, 'Pressed', disabled)}
    }
  `}
`;

RadioButtonComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

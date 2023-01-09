import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';
import type { ITheme } from '../themes';

import { SwitchWrapper } from './SwitchWrapper';
import { SwitchSlider } from './SwitchSlider';

interface ISwitchComponentProps {
  disabled: boolean;
}

const commonSwitchComponentStyles = (
  theme: ITheme,
  type: 'Focus' | 'Hover' | 'Pressed',
  disabled: boolean
) => css`
  &:after {
    background-color: ${disabled ? 'transparent' : theme.color.opacity['black' + type]};
  }
`;

export const SwitchComponent = styled.div<ISwitchComponentProps>`
  display: flex;
  align-items: center;
  ${({ disabled, theme }) => css`
    cursor: ${disabled ? 'default' : 'pointer'};
    color: ${disabled ? theme.color.neutral[30] : theme.color.neutral[90]};
  `}
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  &:focus {
    outline: none;
  }

  ${({ theme, disabled }) => css`
    &:focus > ${SwitchWrapper} > ${SwitchSlider} {
      ${commonSwitchComponentStyles(theme, 'Focus', disabled)}
    }
    &:hover > ${SwitchWrapper} > ${SwitchSlider} {
      ${commonSwitchComponentStyles(theme, 'Hover', disabled)}
    }
    &:active > ${SwitchWrapper} > ${SwitchSlider} {
      ${commonSwitchComponentStyles(theme, 'Pressed', disabled)}
    }
  `}
`;

SwitchComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

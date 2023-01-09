import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';
import type { ITheme } from '../themes';

import { Mark } from './Mark';
import { IndeterminateMark } from './IndeterminateMark';
import { CHECKBOX_MIN_HEIGHT_BIG, CHECKBOX_MIN_HEIGHT_SMALL } from './constants';
import type { ICommonProps } from './IndeterminateMark';

const commonCheckboxComponentStyle = (
  theme: ITheme,
  type: 'Hover' | 'Focus' | 'Pressed',
  disabled?: boolean
) => css`
  ${Mark}, ${IndeterminateMark} {
    &:before {
      background-color: ${disabled ? 'transparent' : theme.color.opacity['black' + type]};
    }
  }
`;

export const CheckboxComponent = styled.div<ICommonProps>`
  box-sizing: border-box;
  display: flex;
  ${({ disabled, theme, size }) =>
    css`
      cursor: ${disabled ? 'default' : 'pointer'};
      min-height: ${size === 'small' ? CHECKBOX_MIN_HEIGHT_SMALL : CHECKBOX_MIN_HEIGHT_BIG};

      &:hover {
        ${commonCheckboxComponentStyle(theme, 'Hover', disabled)}
      }

      &:focus {
        outline: none;
        ${commonCheckboxComponentStyle(theme, 'Focus', disabled)}
      }

      &:active {
        ${commonCheckboxComponentStyle(theme, 'Pressed', disabled)}
      }
    `}
`;

CheckboxComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

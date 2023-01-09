import { css } from 'styled-components';

import type { ITheme } from '../../themes';

export const stylePoint = (theme: ITheme, disabled = false) => {
  return css`
    :hover {
      background: ${disabled ? theme.color.neutral[20] : theme.color.primary[70]};
      box-shadow: ${theme.boxShadow[2]};
    }

    :active {
      background: ${disabled ? theme.color.neutral[20] : theme.color.primary[70]};
      box-shadow: ${theme.boxShadow[2]};
    }
  `;
};

export const getTextColor = (theme: ITheme, disabled = false) => {
  return css`
    color: ${disabled ? theme.color.neutral[30] : theme.color.neutral[50]};
  `;
};

export const getValueStyle = (theme: ITheme, disabled = false, isRight = false) => {
  return css`
    position: absolute;
    bottom: -22px;
    ${getTextColor(theme, disabled)}
    ${isRight ? 'right: -3px' : 'left: -3px'};
  `;
};

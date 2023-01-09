import { css } from 'styled-components';

import type { ITheme } from '../themes';

import { RadioButtonSize, OUTER_CIRCLE_OFFSET_BIG, OUTER_CIRCLE_OFFSET_SMALL } from './constants';

export const RadioScaleAnimation = css`
  @keyframes RadioScale {
    0% {
      transform: translate(-50%, -50%) scale(0);
    }
    80% {
      transform: translate(-50%, -50%) scale(1.2);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

export const MarkBeforeContainer = (size: RadioButtonSize) => css`
  top: -${size === 'small' ? OUTER_CIRCLE_OFFSET_SMALL : OUTER_CIRCLE_OFFSET_BIG};
  left: -${size === 'small' ? OUTER_CIRCLE_OFFSET_SMALL : OUTER_CIRCLE_OFFSET_BIG};
  bottom: -${size === 'small' ? OUTER_CIRCLE_OFFSET_SMALL : OUTER_CIRCLE_OFFSET_BIG};
  right: -${size === 'small' ? OUTER_CIRCLE_OFFSET_SMALL : OUTER_CIRCLE_OFFSET_BIG};
`;

export const commonRadioButtonComponentStyle = (
  theme: ITheme,
  type: 'Hover' | 'Pressed' | 'Focus',
  disabled?: boolean
) => css`
  input + div {
    &:before {
      background-color: ${disabled ? 'transparent' : theme.color.opacity['black' + type]};
    }
  }
`;

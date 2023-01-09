import type { ITheme } from '../themes';

export const markerStyle = (
  theme: ITheme,
  offset: number,
  inverse?: boolean,
  disabled?: boolean
) => `
    &:before {
      content: '';
      position: absolute;
      top: -${offset}px;
      left: -${offset}px;
      bottom: -${offset}px;
      right: -${offset}px;
      border-radius: 50%;
      background-color: transparent;
    }

    &:hover {
      ${markerStateStyle(theme, 'Hover', inverse, disabled)}
    }
    &:focus {
      outline: none;
      ${markerStateStyle(theme, 'Focus', inverse, disabled)}
    }
    &:active {
      ${markerStateStyle(theme, 'Pressed', inverse, disabled)}
    }
`;

const markerStateStyle = (
  theme: ITheme,
  type: 'Hover' | 'Pressed' | 'Focus',
  inverse?: boolean,
  disabled?: boolean
) => `
    &:before {
      background-color: ${
        disabled ? 'transparent' : theme.color.opacity[(inverse ? 'white' : 'black') + type]
      };
    }
`;

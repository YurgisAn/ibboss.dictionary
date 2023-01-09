import { markerStyle } from '../common/marker';
import { TYPOGRAPHY } from '../Typography';
import type { ITheme } from '../themes';

import { CalendarSize } from './constants';

export const getIconSize = (size: CalendarSize) => (size === 'big' ? 24 : 20);

export const capitalizeFirstLetter = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const navigationLeftRightStyle = (
  theme: ITheme,
  markerOffset: number,
  disabled: boolean
) => `
    ${disabled ? 'pointer-events: none;' : ''}
    display: flex;
    align-items: center;
    justify-content: center;
    & svg {
      fill: ${theme.color.neutral[disabled ? 30 : 50]};
    }
    &:hover {
      cursor: pointer;
    }
    ${markerStyle(theme, markerOffset, false)}
`;

export const navigationUpDownStyle = (theme: ITheme, markerOffset: number, disabled: boolean) => `
    ${disabled ? 'pointer-events: none;' : ''}
    position: relative;
    display: inline-flex;
    vertical-align: middle;
    & svg {
      fill: ${theme.color.neutral[disabled ? 30 : 50]};
    }
    &:hover {
      cursor: pointer;
    }
    ${markerStyle(theme, markerOffset, false)}
`;

export const fontStyle = (size: CalendarSize) => `
  font-family: ${TYPOGRAPHY.fontFamily};
  font-size: ${TYPOGRAPHY.fontSize[size === 'big' ? 13 : 11]};
  font-weight: ${TYPOGRAPHY.fontWeight.regular};
  line-height: ${TYPOGRAPHY.lineHeight[16]};
`;

export const selectedStyle = (theme: ITheme) => `
    outline: 0;
    background-color: ${theme.color.primary[60]};
    color: ${theme.color.neutral.white};
    border-radius: 4px;

    &:hover {
      background-color: ${theme.color.primary[70]};
    }

    &:after {
      visibility: hidden;
    }
`;

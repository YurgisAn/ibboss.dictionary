import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { getBackgroundColor, getTextColor } from './utils';

const BORDER_RADIUS_BIG = 10;
const BORDER_RADIUS_SMALL = 8;

const HEIGHT_BIG = 20;
const HEIGHT_SMALL = 16;

const HORIZONTAL_PADDING_BIG = 7;
const HORIZONTAL_PADDING_SMALL = 5;

const MIN_WIDTH_BIG = 22;
const MIN_WIDTH_SMALL = 17;

export type Kind =
  | 'neutral-grey'
  | 'neutral-dark'
  | 'info'
  | 'warning'
  | 'error'
  | 'success'
  | 'neutral-light'
  | 'neutral-light-disabled'
  | 'neutral-light-inactive'
  | 'neutral-white'
  | 'neutral-white-disabled'
  | 'neutral-white-inactive';

export type Size = 'big' | 'small';

interface IBadgeComponentProps {
  kind: Kind;
  size: Size;
}

export const BadgeComponent = styled.div<IBadgeComponentProps>`
  ${({ kind, size, theme }) => css`
    align-items: center;
    background-color: ${getBackgroundColor(kind, theme)};
    border-radius: ${size === 'big' ? BORDER_RADIUS_BIG : BORDER_RADIUS_SMALL}px;
    color: ${getTextColor(kind, theme)};
    display: flex;
    height: ${size === 'big' ? HEIGHT_BIG : HEIGHT_SMALL}px;
    justify-content: center;
    min-width: ${size === 'big' ? MIN_WIDTH_BIG : MIN_WIDTH_SMALL}px;
    padding: 0 ${size === 'big' ? HORIZONTAL_PADDING_BIG : HORIZONTAL_PADDING_SMALL}px;
    user-select: none;
  `};
`;

BadgeComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

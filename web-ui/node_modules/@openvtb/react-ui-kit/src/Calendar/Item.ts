import styled from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { CalendarSize } from './constants';
import { fontStyle, selectedStyle } from './utils';

export interface IItemProps {
  size: CalendarSize;
  today?: boolean;
  selected?: boolean;
  disabled?: boolean;
}

export const Item = styled.div<IItemProps>`
  position: relative;
  display: inline-block;
  margin: 0;
  user-select: none;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    ${({ theme }) => `
      border: 2px solid ${theme.color.primary[60]};
      border-radius: 4px;
    `}
    visibility: hidden;
  }

  ${({ theme, today }) =>
    today
      ? `
      &:not(:hover) {
        &:after {
          border: 2px solid ${theme.color.neutral[90]};
          border-radius: 4px;
          visibility: visible;
        }
      }
    `
      : ''}

  ${({ selected }) =>
    selected
      ? ''
      : `
      &:hover {
        &:after {
          visibility: visible;
        }
      }
    `}

    &:focus {
    outline: 0;
  }

  ${({ theme, size, selected, disabled }) => `
    color: ${theme.color.neutral[disabled ? 30 : 90]};
    ${fontStyle(size)}
    ${selected ? selectedStyle(theme) : ''}
  `}
`;

Item.defaultProps = {
  theme: DEFAULT_THEME,
};

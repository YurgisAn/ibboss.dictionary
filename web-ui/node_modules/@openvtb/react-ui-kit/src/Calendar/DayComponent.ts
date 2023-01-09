import styled from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { DAY_SIZES, DAY_PADDINGS } from './constants';
import { Item } from './Item';
import type { IItemProps } from './Item';
import type { Corners } from './constants';

interface IDayComponentProps extends IItemProps {
  inRange?: boolean;
  corners?: Corners;
}

export const DayComponent = styled(Item)<IDayComponentProps>`
  ${({ size }) => `
    width: ${DAY_SIZES[size]}px;
    padding: ${DAY_PADDINGS[size]}px 0;
  `}
  ${({ theme, inRange, corners }) =>
    inRange
      ? `
    &:before {
      z-index: -1;
      content: '';
      position: absolute;
      width: 100%;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      visibility: visible;
      background-color: ${theme.color.primary[20]};
      ${
        corners &&
        Object.keys(corners)
          .map((key) => (corners[key] ? `border-${key}-radius: 4px;` : ''))
          .join('')
      }
    }
  `
      : ''}
`;

DayComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

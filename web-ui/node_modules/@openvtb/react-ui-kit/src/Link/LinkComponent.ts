import styled from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { Caption13 } from './Caption13';
import { Caption15 } from './Caption15';
import { SIZES, LINK_ICON_PADDING } from './constants';
import { getColors } from './utils';
import type { LinkKind, LinkSize, LinkIconPosition } from './constants';

export type BasicLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

interface ILinkComponentProps extends BasicLinkProps {
  kind: LinkKind;
  size: LinkSize;
  iconPosition?: LinkIconPosition;
  inverse: boolean;
  disabled: boolean;
}

export const LinkComponent = styled.a<ILinkComponentProps>`
  outline: none;
  position: relative;
  display: inline;
  box-sizing: border-box;
  ${({ size }) => `
    height: ${SIZES[size]}px;
  `}

  ${({ theme, kind, iconPosition, inverse, disabled }) =>
    disabled
      ? `
      pointer-events: none;
      cursor: default;
      color: ${inverse ? theme.color.neutral[50] : theme.color.neutral[30]};
      svg {
        fill: ${inverse ? theme.color.neutral[50] : theme.color.neutral[30]};
      }
    `
      : `
      cursor: pointer;
      color: ${getColors(theme, kind, inverse).color};
      svg {
        fill: ${getColors(theme, kind, inverse).fill};
      }

      &:hover, &:active {
        color: ${getColors(theme, kind, inverse).hover.color};
        ${
          !iconPosition
            ? `border-bottom: 1px solid ${getColors(theme, kind, inverse).hover.color};`
            : ''
        }
        svg {
          fill: ${getColors(theme, kind, inverse).hover.fill};
        }
      }

      &:focus {
        color: ${getColors(theme, kind, inverse).focus.color};
        border-bottom: 2px solid ${inverse ? theme.color.primary[40] : theme.color.primary[60]};
        svg {
          fill: ${getColors(theme, kind, inverse).focus.fill};
        }
      }
  `}

  ${Caption13}, ${Caption15} {
    display: inline;
    ${({ iconPosition }) => `
      padding-left: ${iconPosition === 'left' ? LINK_ICON_PADDING : 0};
      padding-right: ${iconPosition === 'right' ? LINK_ICON_PADDING : 0};
    `}
  }
`;

LinkComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

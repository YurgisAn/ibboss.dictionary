import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../default-theme';
import { MEDIA_MOBILE } from '../media';
import { Z_INDEXES } from '../z-indexes';

import { NotificationComponent } from './NotificationComponent';
import { Header } from './Header';
import { Message } from './Message';
import { Icon } from './Icon';
import { IconClose } from './IconClose';
import { getInverseColor } from './utils';
import { DYNAMIC_PADDING, MOBILE_DYNAMIC_PADDING, MOBILE_MARGIN, TOP_MARGIN } from './constants';
import type { INotificationComponentProps } from './NotificationComponent';

export interface IDynamicNotificationComponentProps extends INotificationComponentProps {
  inverse?: boolean;
  mobile?: boolean;
  managed?: boolean;
  top?: number;
  left?: number;
  right?: number;
}

export const DynamicNotificationComponent = styled(
  NotificationComponent
)<IDynamicNotificationComponentProps>`
  padding: ${DYNAMIC_PADDING};

  ${({ top, left, right, managed }) =>
    managed
      ? `
    ${top !== undefined ? `margin-top: ${top}px;` : ''}
    ${left !== undefined ? `margin-left: ${left}px;` : ''}
    ${
      right !== undefined
        ? `
      margin-left: auto;
      margin-right: ${right}px;
    `
        : ''
    }
    &:not(:first-child) {
      margin-top: ${TOP_MARGIN};
    }
    @media ${MEDIA_MOBILE} {
      margin-top: ${MOBILE_MARGIN};
      margin-left: ${MOBILE_MARGIN};
    }
  `
      : `
    position: fixed;
    z-index: ${Z_INDEXES.NOTIFICATION};
    ${top !== undefined ? `top: ${top}px;` : ''}
    ${left !== undefined ? `left: ${left}px;` : ''}
    ${right !== undefined ? `right: ${right}px;` : ''}
    &:not(:first-child) {
      top: ${TOP_MARGIN};
    }
    @media ${MEDIA_MOBILE} {
      top: ${MOBILE_MARGIN};
      left: ${MOBILE_MARGIN};
    }
  `}

  @media ${MEDIA_MOBILE} {
    width: calc(100% - 2 * ${MOBILE_MARGIN});
    padding: ${MOBILE_DYNAMIC_PADDING};

    ${Icon} {
      display: none;
    }

    ${({ mobile }) =>
      mobile &&
      css`
        ${IconClose} {
          display: none;
        }
      `}
  }

  ${({ theme, kind, inverse }) =>
    inverse
      ? `
        background-color: ${theme.color.neutral[80]};
        border-left: 4px solid ${getInverseColor(kind, theme)};
        ${Header}, ${Message} {
          color: ${theme.color.neutral.white};
        }
        ${Icon} svg {
          fill: ${getInverseColor(kind, theme)};
        }
        ${IconClose} svg {
          fill: ${theme.color.neutral.white};
          &:hover {
            fill: ${theme.color.primary[40]};
          }
        }`
      : `
        box-shadow: ${theme.boxShadow[4]};
        ${IconClose} svg {
          fill: ${theme.color.neutral[50]};
          &:hover {
            fill: ${theme.color.primary[60]};
          }
        }
  `}
`;

DynamicNotificationComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

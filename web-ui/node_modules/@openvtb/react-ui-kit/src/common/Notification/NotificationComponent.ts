import styled, { css } from 'styled-components';
import type { ReactNode } from 'react';

import { DEFAULT_THEME } from '../../common';
import { ReactComponent as InfoSolid } from '../../Icons/service/InfoSolid.svg';
import { ReactComponent as ErrorSolid } from '../../Icons/service/ErrorSolid.svg';
import { ReactComponent as CheckSolid } from '../../Icons/service/CheckSolid.svg';
import { ReactComponent as CloseCircleSolid } from '../../Icons/service/CloseCircleSolid.svg';

import { Icon } from './Icon';
import { STATIC_PADDING } from './constants';
import { getColor, getBackgroundColor } from './utils';

export type NotificationKind = 'info' | 'warning' | 'success' | 'error';

export const NOTIFICATION_ICONS = {
  info: InfoSolid,
  warning: ErrorSolid,
  success: CheckSolid,
  error: CloseCircleSolid,
};

export interface INotificationProps {
  /** Текст короткого оповещения */
  children: ReactNode;
  /** Вид оповещения */
  kind?: NotificationKind;
  /** Заголовок оповещения */
  header?: string;
  /** Ширина оповещения */
  width?: number | string;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
}

export interface INotificationComponentProps {
  kind: NotificationKind;
  width: number | string;
}

export const NotificationComponent = styled.div<INotificationComponentProps>`
  position: relative;
  padding: ${STATIC_PADDING};
  box-sizing: border-box;

  ${({ theme, kind, width }) => css`
    background-color: ${getBackgroundColor(kind, theme)};
    border-left: 4px solid ${getColor(kind, theme)};
    border-radius: 0 ${theme.borderRadius} ${theme.borderRadius} 0;
    width: ${typeof width === 'number' ? `${width}px` : width};
    ${Icon} {
      & svg {
        fill: ${getColor(kind, theme)};
        width: 24px;
        height: 24px;
      }
    }
  `}
`;

NotificationComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

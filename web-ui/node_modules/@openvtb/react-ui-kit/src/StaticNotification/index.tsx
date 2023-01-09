import React, { FC } from 'react';

import {
  INotificationProps,
  NOTIFICATION_ICONS,
} from '../common/Notification/NotificationComponent';
import { Icon } from '../common/Notification/Icon';
import { Header } from '../common/Notification/Header';
import { Message } from '../common/Notification/Message';

import { StaticNotificationComponent } from './StaticNotificationComponent';

export interface IStaticNotificationProps extends INotificationProps {
  /** Принудительно белый фон (необходим при нахождении в контейнере с серым фоном) */
  showWhiteBackground?: boolean;
}

const DEFAULT_WIDTH = '320px';

export const StaticNotification: FC<IStaticNotificationProps> = ({
  children,
  kind = 'info',
  width = DEFAULT_WIDTH,
  header,
  showWhiteBackground,
  className,
  dataTestId,
}: IStaticNotificationProps) => {
  const KindIcon = NOTIFICATION_ICONS[kind];
  return (
    <StaticNotificationComponent
      className={className}
      data-test-id={dataTestId}
      kind={kind}
      width={width}
      showWhiteBackground={showWhiteBackground}
    >
      <Icon>
        <KindIcon />
      </Icon>
      {!!header && <Header hasOffset>{header}</Header>}
      <Message>{children}</Message>
    </StaticNotificationComponent>
  );
};

import React, { FC } from 'react';

import { Header } from '../common/Notification/Header';
import { Message } from '../common/Notification/Message';
import { DynamicNotification } from '../common/Notification/DynamicNotification';
import type { IDynamicNotificationProps } from '../common/Notification/DynamicNotification';

export interface ILineNotificationProps extends IDynamicNotificationProps {
  /** Принудительно тёмный фон */
  showDarkBackground?: boolean;
}

export const LineNotification: FC<ILineNotificationProps> = ({
  children,
  header,
  showDarkBackground,
  ...props
}) => (
  <DynamicNotification inverse={showDarkBackground} top={0} left={0} {...props}>
    {!!header && <Header>{header}</Header>}
    <Message>{children}</Message>
  </DynamicNotification>
);

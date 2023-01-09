import React, { FC } from 'react';

import { Link } from '../Link';
import { Header } from '../common/Notification/Header';
import { Message } from '../common/Notification/Message';
import { DynamicNotification } from '../common/Notification/DynamicNotification';
import type { IDynamicNotificationProps } from '../common/Notification/DynamicNotification';

const DEFAULT_WIDTH = 384;
const LINK_PADDING = 12;

export interface ILink {
  /** Гиперссылка */
  href: string;
  /** Текст гиперссылки (по умолчанию текстом будет href) */
  text?: string;
}

export interface IToastNotificationProps extends IDynamicNotificationProps {
  /** Гиперссылка */
  link?: ILink;
}

export const ToastNotification: FC<IToastNotificationProps> = ({
  children,
  header,
  link,
  width,
  ...props
}: IToastNotificationProps) => (
  <DynamicNotification inverse top={16} right={16} width={width || DEFAULT_WIDTH} {...props}>
    <Header hasOffset>{header}</Header>
    <Message paddingBottom={link ? LINK_PADDING : undefined}>{children}</Message>
    {link ? (
      <Link href={link.href} size={'small'} inverse>
        {link.text || link.href}
      </Link>
    ) : (
      ''
    )}
  </DynamicNotification>
);

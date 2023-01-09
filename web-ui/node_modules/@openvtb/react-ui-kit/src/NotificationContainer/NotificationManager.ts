import { EventEmitter } from 'events';

import type { ILineNotificationProps } from '../LineNotification';
import type { IToastNotificationProps } from '../ToastNotification';
import type { IDynamicNotificationProps } from '../common/Notification/DynamicNotification';

export type NotificationType = 'toast' | 'line';

export interface IExtendedNotificationProps extends IDynamicNotificationProps {
  type: NotificationType;
  id: number;
  managed: boolean;
}

type INotificationProps = IToastNotificationProps | ILineNotificationProps;

const CHANGE_EVENT_NAME = 'change';

const generateId = () => new Date().getTime();

export class NotificationManager extends EventEmitter {
  private notifications: IExtendedNotificationProps[] = [];

  private emitChange() {
    this.emit(CHANGE_EVENT_NAME, this.notifications);
  }

  create(type: NotificationType, notification: INotificationProps) {
    this.notifications.push({
      type,
      managed: true,
      id: generateId(),
      ...notification,
    });
    this.emitChange();
  }

  remove(notification: INotificationProps) {
    this.notifications = this.notifications.filter((n) => notification['id'] !== n.id);
    this.emitChange();
  }

  addEventListener(callback: any) {
    this.addListener(CHANGE_EVENT_NAME, callback);
  }

  removeEventListener(callback: any) {
    this.removeListener(CHANGE_EVENT_NAME, callback);
  }
}

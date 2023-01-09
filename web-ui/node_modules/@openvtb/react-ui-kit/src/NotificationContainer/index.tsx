import React from 'react';
import ReactDOM from 'react-dom';

import { LineNotification } from '../LineNotification';
import { ToastNotification } from '../ToastNotification';

import { NotificationContainerComponent } from './NotificationContainerComponent';
import { NotificationManager } from './NotificationManager';
import type { Position } from './NotificationContainerComponent';
import type { IExtendedNotificationProps } from './NotificationManager';

export interface INotificationContainerProps {
  /** Позиция оповещений (вверху/внизу, по умолчанию - вверху) */
  position?: Position;
  /** Контейнер, в котором происходит размещение оповещения */
  container?: Element;
  /** Имя класса для переопределения стилей */
  className?: string;
}

const Manager = new NotificationManager();

interface INotificationContainerState {
  notifications: IExtendedNotificationProps[];
}

export class NotificationContainer extends React.Component<
  INotificationContainerProps,
  INotificationContainerState
> {
  public static Manager = Manager;

  state: INotificationContainerState = {
    notifications: [],
  };

  componentDidMount = () => {
    Manager.addEventListener(this.handleChange);
  };

  componentWillUnmount = () => {
    Manager.removeEventListener(this.handleChange);
  };

  handleChange = (notifications: IExtendedNotificationProps[]) => {
    this.setState({ notifications });
  };

  handleHide = (notification: IExtendedNotificationProps) => () => {
    Manager.remove(notification);
  };

  renderNotifications() {
    const { notifications } = this.state;
    const { position, className } = this.props;
    const list =
      position && position === 'bottom'
        ? notifications
        : notifications.sort((n1, n2) => n2.id - n1.id);
    return (
      <NotificationContainerComponent position={position || 'top'} className={className}>
        {list.map((notification) => {
          const Notification = notification.type === 'toast' ? ToastNotification : LineNotification;
          return (
            <Notification
              {...notification}
              onHide={this.handleHide(notification)}
              key={notification.id}
            />
          );
        })}
      </NotificationContainerComponent>
    );
  }

  render() {
    const { container } = this.props;
    return container
      ? ReactDOM.createPortal(this.renderNotifications(), container)
      : this.renderNotifications();
  }
}

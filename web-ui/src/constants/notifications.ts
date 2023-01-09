import { NotificationAlert, NotificationType } from '@vtb-ermo/notifications';

export const USER_IS_NOT_AUTHENTICATED: NotificationAlert = {
    id: 'user-is-not-authenticated',
    type: NotificationType.DANGER,
    title: 'Вы не аутентифицированы',
    memorable: false,
    locked: true,
};
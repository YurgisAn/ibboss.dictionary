import { NotificationAlert, NotificationType } from '@vtb-ermo/notifications';

export const bicLoadingError: NotificationAlert = {
    id: 'bic-loading-error',
    type: NotificationType.DANGER,
    title: 'Ошибка создания или просмотра БИК',
    message: 'Попробуйте повторить попытку через некоторое время.',
    memorable: false,
    locked: false,
};

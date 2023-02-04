import { NotificationAlert, NotificationType } from '@vtb-ermo/notifications';

export const HolidayCurrencyLoadingError: NotificationAlert = {
    id: 'holiday_currency-loading-error',
    type: NotificationType.DANGER,
    title: 'Ошибка создания или просмотра производственного календаря валют',
    message: 'Попробуйте повторить попытку через некоторое время.',
    memorable: false,
    locked: false,
};

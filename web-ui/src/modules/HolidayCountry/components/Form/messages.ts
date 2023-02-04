import { NotificationAlert, NotificationType } from '@vtb-ermo/notifications';

export const HolidayCountryLoadingError: NotificationAlert = {
    id: 'holiday_country-loading-error',
    type: NotificationType.DANGER,
    title: 'Ошибка создания или просмотра производственного календаря стран',
    message: 'Попробуйте повторить попытку через некоторое время.',
    memorable: false,
    locked: false,
};

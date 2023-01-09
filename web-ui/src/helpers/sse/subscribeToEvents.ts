import { IUser } from '@vtb-ermo/authorization';

import { EventCallback, EventType } from './types';

// @ts-ignore-next-line
const endpoint = SSE_PATH;
const subscribers: { [key: string]: (event: any) => void } = {};
let eventSource = null as unknown as EventSource;

export const subscribeToEvents = <T>(userId: IUser['id'], type: EventType, callback: EventCallback<T>) => {
    if (userId && type && callback) {
        if (!eventSource) {
            eventSource = new EventSource(`${endpoint}?userId=${userId}`, {
                withCredentials: false,
            });
        }

        if (subscribers[type]) {
            eventSource.removeEventListener(type, subscribers[type]);
            delete subscribers[type];
        }

        subscribers[type] = (event: any) => {
            const eventData = JSON.parse(event.data);
            callback({
                id: event.lastEventId,
                data: eventData,
            });
        };

        eventSource.addEventListener('NOTIFICATION', subscribers['NOTIFICATION']);

        return true;
    } else {
        return false;
    }
};

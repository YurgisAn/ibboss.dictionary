export enum EventType {
    NOTIFICATION = 'NOTIFICATION',
}

export type EventCallback<T> = (response: { id: any; data: T }) => void;

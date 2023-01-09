import { ComponentType } from 'react';

import { Container } from './types';

export function loadRemoteComponent<T extends ComponentType<any>>(
    url: string,
    scope: string,
    module: string
): () => Promise<{ default: T }> {
    return async () => {
        await new Promise<void>((resolve, reject) => {
            const element = document.createElement('script');

            element.src = url;
            element.type = 'text/javascript';
            element.async = true;

            element.onload = () => {
                element.parentElement?.removeChild(element);
                resolve();
            };
            element.onerror = (error) => {
                element.parentElement?.removeChild(element);
                reject(error);
            };

            document.head.appendChild(element);
        });

        // @ts-ignore
        await __webpack_init_sharing__('default');
        // @ts-ignore
        const container = window[scope] as Container;

        if (!container) {
            throw new Error(
                `Не удалось обнаружить неймспейс "${scope}" в подключаемом микрофронте. Типичная причина этой ошибки - несовпадение "containerName" в конфигурации подключения микрофронта и поля "name" в remote.config.js`
            );
        }

        // @ts-ignore
        await container.init(__webpack_share_scopes__.default);
        const factory = await container.get(module);

        if (!factory) {
            throw new Error(
                `Не удалось обнаружить модуль "${module}" в подключаемом микрофронте. Типичная причина этой ошибки - несовпадение поля "moduleName" в конфигурации подключения микрофронта и поля "exposes" в remote.config.js`
            );
        }

        return factory();
    };
}

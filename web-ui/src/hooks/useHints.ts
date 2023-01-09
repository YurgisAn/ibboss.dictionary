import { useAuthorization } from '@vtb-ermo/authorization';
import { useEffect } from 'react';

export const useHints = (): void => {
    const { isAuthorized, user } = useAuthorization();

    const initializeHints = (userId: string) => {
        const organizationId = window.HINTED_CONFIG?.organizationId;
        const server = window.HINTED_CONFIG?.server;
        if (server && organizationId) {
            const bodyRoot = document.querySelector('body');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `${server}/plugins/hinted-ondemand-widget.min.js`;
            script.setAttribute('organizationId', organizationId);
            script.setAttribute('host', `${server}/api`);
            script.setAttribute('username', userId);
            script.setAttribute('isSPA', 'true');
            script.setAttribute('spaSelector', '[data-at=content]');
            script.setAttribute('groups', 'public');
            bodyRoot?.appendChild(script);
        } else {
            console.log('No params for initial Hints!');
        }
    };

    useEffect(() => {
        if (isAuthorized && user.id) {
            initializeHints(user.id);
        }
    }, [isAuthorized, user.id]);
};

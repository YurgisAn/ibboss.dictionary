import React, { useEffect } from 'react';
import { Switch, Route, useNavigation } from '@vtb-ermo/router';
import { useAuthorization } from '@vtb-ermo/authorization';
import { useNotifications } from '@vtb-ermo/notifications';

import { AppContainer, Content } from './styled';
import { USER_IS_NOT_AUTHENTICATED } from '../../constants/notifications';
import { SourceBook } from '~/modules/SourceBook';

export const App = () => {
    const { isInit, isAuthorized } = useAuthorization();
    const { routes } = useNavigation();
    const { publish, unPublish } = useNotifications();

    // Пример публикации уведомления
    useEffect(() => {
        if (isInit) {
            !isAuthorized && publish(USER_IS_NOT_AUTHENTICATED);
        }
        return () => {
            unPublish(USER_IS_NOT_AUTHENTICATED['id']);
        };
    }, [isInit, isAuthorized, publish, unPublish]);

    return (
        <AppContainer>
            <h1>Единое рабочее место оператора</h1>
            <SourceBook book='bic'></SourceBook>
        </AppContainer>
    );
};
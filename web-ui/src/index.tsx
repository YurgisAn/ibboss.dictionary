import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from '@vtb-ermo/authorization';
import { CoreRouter } from '@vtb-ermo/router';
import { LIGHT_THEME } from '@vtb/ui-kit3';
import { NotificationsProvider } from '@vtb-ermo/notifications';
import { ThemeProvider } from 'styled-components';

import { App } from './components/App';
import { GlobalStyle } from './styles/GlobalStyle';
import { Header } from './components/Header';

import './styles/fonts.css';

ReactDOM.render(
    <ThemeProvider theme={LIGHT_THEME}>
        <AuthProvider endpoint={'/'}>
            <NotificationsProvider>
                <CoreRouter>
                    <GlobalStyle/>
                    <Header/>
                    <App/>
                </CoreRouter>
            </NotificationsProvider>
        </AuthProvider>
    </ThemeProvider>,
    document.getElementById('root'),
);
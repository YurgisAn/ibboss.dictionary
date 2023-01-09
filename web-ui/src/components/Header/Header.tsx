import React from 'react';

import { HeaderContainer } from './styled';
import {
    Logo,
} from './components';
import { Notifications } from '@vtb-ermo/notifications';


export const Header: React.FC = () => (
    <HeaderContainer>
        <Logo/>
        <Notifications/>
    </HeaderContainer>
);

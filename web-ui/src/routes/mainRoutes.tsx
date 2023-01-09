import { PermissionCode } from '@vtb-ermo/authorization';
import { routes } from '@vtb-ermo/router';
import { Sourcebook } from '~/modules/Sourcebook';
import React from 'react';

import { MainRouteType } from './types';

export const mainRoutes: MainRouteType[] = [
    {
        path: `bics`,
        component: <Sourcebook />,
        exact: true,
    }
];

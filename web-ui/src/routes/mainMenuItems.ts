import { PermissionCode } from '@vtb-ermo/authorization';
import { routes } from '@vtb-ermo/router';
import { IMainMenuItem } from '~/routes/types';

export const mainMenuItems: IMainMenuItem[] = [
    {
        title: 'Справочник БИК',
        path: `bics`
    }    
];

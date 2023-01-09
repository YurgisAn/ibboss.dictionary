import { useAuthorization } from '@vtb-ermo/authorization';
import React, { FC } from 'react';

import { mainMenuItems } from '~/routes';

import { MenuItem } from './components/MenuItem';
import { MenuContainer } from './styled';

export const Menu: FC = () => {
    const { checkPermission } = useAuthorization();

    const menuItems = mainMenuItems
        .filter((item) => (item?.requiredPermissions ? checkPermission(item.requiredPermissions) : true))
        .filter((item) => !item.disabled);

    return (
        <MenuContainer data-at='menu'>
            {menuItems.map(({ badgeComponent, path, title }) => {
                const Badge = badgeComponent;

                return (
                    <MenuItem key={path} href={path}>
                        <span>{title}</span>
                        {Badge && <Badge />}
                    </MenuItem>
                );
            })}
        </MenuContainer>
    );
};

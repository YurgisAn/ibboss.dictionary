import { PermissionCode } from '@vtb-ermo/authorization';
import { ComponentType, ReactElement } from 'react';

export type MainRouteType = {
    path: string;
    exact?: boolean;
    requiredPermissions?: PermissionCode[];
    component?: ReactElement;
};

export type RouteType = {
    path: string;
    systemCode: string | null;
    taskInfoPanel?: boolean;
    component: ReactElement;
    requiredPermissions?: PermissionCode[];
};

export type RemoteRouteType = {
    name: string;
    systems: RouteType[];
};

export interface IMainMenuItem {
    title: string;
    path: string;
    requiredPermissions?: PermissionCode[];
    disabled?: boolean;
    badgeComponent?: ComponentType;
}

export interface IApplicationMenuCard {
    processCode?: string;
    title: string;
    path?: string;
    icon?: ReactElement;
    items: IApplicationMenuItem[];
    disabled?: boolean;
}

export interface IApplicationMenuItem {
    title: string;
    path: string;
}

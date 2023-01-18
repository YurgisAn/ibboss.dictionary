/**
 * Заголовок модуля
 */
import React from 'react';

import { ModuleHeaderWrapper, TitleWrapper } from './styled';

type PropsType = {
    title: string;
};

export const ModuleHeader: React.FC<PropsType> = (props): JSX.Element => {
    return (
        <ModuleHeaderWrapper>
            <TitleWrapper>{props.title}</TitleWrapper>
            {props.children}
        </ModuleHeaderWrapper>
    );
};

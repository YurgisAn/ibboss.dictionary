import { useAuthorization } from '@vtb-ermo/authorization';
import React from 'react';

import { Loader } from '../Loader';

import { ContentContainer } from './styles';

export const Content: React.FC = (props) => {
    const { isInit } = useAuthorization();

    return <ContentContainer data-at='content'>{isInit ? props.children : <Loader />}</ContentContainer>;
};

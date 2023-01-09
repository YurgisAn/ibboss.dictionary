import { Spinner, SpinnerProps } from '@vtb/ui-kit3';
import React, { FC } from 'react';

import { LoaderContainer } from './styles';

export const Loader: FC<{ dimension?: SpinnerProps['dimension'] }> = ({ dimension = 'l' }) => (
    <LoaderContainer data-at='loader'>
        <Spinner dimension={dimension} />
    </LoaderContainer>
);

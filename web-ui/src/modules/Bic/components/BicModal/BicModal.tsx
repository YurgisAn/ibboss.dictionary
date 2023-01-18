/**
 * Получение элемента и открытие формы редактирования
 */
import { Spinner } from '@vtb/ui-kit3';
import type { FC } from 'react';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Form } from '~/modules/Bic/components/Form';
import { useApi } from '~/shared/ApiContext';
import { BicRequest } from '~/shared/models';

import { TypeFormMode } from '~/constants/types';
import { isDefined } from '~/helpers/guards';

type Props = {
    mode: TypeFormMode;
    bicCode: string | undefined;
    onClose?: () => void;
    onSave?: () => void;
};

export const BicModal: FC<Props> = ({ bicCode, mode, onClose, onSave }) => {
    const { bicApi } = useApi();
    const [bic, setBic] = useState<BicRequest>();
    //получаем элемент для просмотра/редактирования
    /*const {
        data: bic,
        isLoading: isLoading,
        isSuccess: isSuccess,
    } = useQuery(
        `bic-${bicCode}`,
        () => (isDefined(bicCode) ? bicApi.getBic({ id: bicCode }) : Promise.resolve(undefined)),
        {
            select: (r) => r?.data,
            cacheTime: 0,
        }
    );*/

    return (
        <>
            {(
                <Form
                    onSave={onSave}
                    onClose={onClose}
                    bic={bic}
                    modalMode={mode}
                />
            )}
        </>
    );
};

/**
 * Получение элемента и открытие формы редактирования
 */
 import { Spinner } from '@vtb/ui-kit3';
 import type { FC } from 'react';
 import React, { useState } from 'react';
 import { useQuery } from 'react-query';
 import { Form } from '~/modules/HolidayCurrency/components/Form';
 import { useApi } from '~/shared/ApiContext';
 import { HolidayCurrencyRequest } from '~/shared/models/holidayCurrency-request';
 
 import { TypeFormMode } from '~/constants/types';
 import { isDefined } from '~/helpers/guards';
 
 type Props = {
     mode: TypeFormMode;
     HolidayCurrencyDay: string | undefined;
     onClose?: () => void;
     onSave?: () => void;
 };
 
 export const HolidayCurrencyModal: FC<Props> = ({ HolidayCurrencyDay, mode, onClose, onSave }) => {
     const [holiday_currency] = useState<HolidayCurrencyRequest>();
 
     return (
         <>
             {(
                 <Form
                     onSave={onSave}
                     onClose={onClose}
                     holiday_currency={holiday_currency}
                     modalMode={mode}
                 />
             )}
         </>
     );
 };
 
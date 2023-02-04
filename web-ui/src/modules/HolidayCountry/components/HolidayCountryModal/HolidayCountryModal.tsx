/**
 * Получение элемента и открытие формы редактирования
 */
 import { Spinner } from '@vtb/ui-kit3';
 import type { FC } from 'react';
 import React, { useState } from 'react';
 import { useQuery } from 'react-query';
 import { Form } from '~/modules/HolidayCountry/components/Form';
 import { useApi } from '~/shared/ApiContext';
 import { HolidayCountryRequest } from '~/shared/models/holidayCountry-request';
 
 import { TypeFormMode } from '~/constants/types';
 import { isDefined } from '~/helpers/guards';
 
 type Props = {
     mode: TypeFormMode;
     HolidayCountryDay: string | undefined;
     onClose?: () => void;
     onSave?: () => void;
 };
 
 export const HolidayCountryModal: FC<Props> = ({ HolidayCountryDay, mode, onClose, onSave }) => {
     const [holiday_country] = useState<HolidayCountryRequest>();
 
     return (
         <>
             {(
                 <Form
                     onSave={onSave}
                     onClose={onClose}
                     holiday_country={holiday_country}
                     modalMode={mode}
                 />
             )}
         </>
     );
 };
 
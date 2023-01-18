/**
 * Схема валидатор 
 */
import * as yup from 'yup';
import type { SchemaOf } from 'yup';

import type {
    BicRequest
} from '~/shared/models';
import { ISODurationPositiveSchema } from '~/helpers/validation';

/**
 * Схема проверки запроса на создание Бика
 */
export const bicRequestSchema: SchemaOf<BicRequest> = yup.object({
    bicCode: yup.string().required().trim(),
    dateIn: ISODurationPositiveSchema.required(),
    participantName:yup.string().required().trim()    
});

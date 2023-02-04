
/**
 * Схема валидатор 
 */
 import * as yup from 'yup';
 import type { SchemaOf } from 'yup';
 
 import type {
     HolidayCountryRequest
 } from '~/shared/models/holidayCountry-request';
 import { ISODurationPositiveSchema } from '~/helpers/validation';
 
 /**
  * Схема проверки запроса на создание производственного календаря стран
  */
 export const HolidayCountryRequestSchema = () => {
 
     return yup.object({
        // day: ISODurationPositiveSchema.required('Поле должно быть заполнено.'),
        day: yup.string().test("isValidDay", function (value) {
              if (value === '__.__.____')
                  return this.createError({ path: this.path, message: "Поле должно быть заполнено." });
              else
                return true;
          }).required('Поле должно быть заполнено.'),

        country_id: yup.number().max(999, "Недопустимое значение: не больше 999").required(),  
         
        type: yup.number().max(1, "Недопустимое значение: можно 0 или 1").required(),
         
          //     .test("isValidTypeCode", function (value) {
 
          //     if (isNaN(Number(value)))
          //         return this.createError({ path: this.path, message: "Недопустимое значение" });
          //     else
          //       if (value == 0 || value == 1) return true;
          //       return this.createError({ path: this.path, message: "Недопустимое значение" });
          // }).required(),

        //  type: yup.boolean(), 

        comment: yup.string().max(100, "Не больше 100 символов.").required('Поле должно быть заполнено.').trim()
     });
 }
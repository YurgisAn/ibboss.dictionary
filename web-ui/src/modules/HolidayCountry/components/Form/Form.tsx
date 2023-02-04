/**
 * Форма для добавления/редактирования/просмотра производственного календаря стран
 */
 import { useAuthorization } from '@vtb-ermo/authorization';
 import { useNotifications } from '@vtb-ermo/notifications';
 import { Button, InputField, ModalButtonPanel, ModalTitle, DateField, RadioButton,
  CheckboxField, TextArea, Label} from '@vtb/ui-kit3';
 import { LIGHT_THEME } from '@vtb/ui-kit3';     
 import { ThemeProvider } from 'styled-components';
 import { Formik } from 'formik';
 import type { FormikProps } from 'formik/dist/types';
 import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
 import type { HolidayCountryRequest } from '~/shared/models/holidayCountry-request';
 import { HolidayCountryLoadingError } from './messages';
 import { useApi } from '~/shared/ApiContext';
 
 import {
     FormRow,
     FormStyled,
     ModalContentStyled,
     ModalStyled
 } from './styled';
 
 import { TypeFormMode } from '~/constants/types';
 import { HolidayCountryRequestSchema } from './validation';
 
 /**
  * Инициализация значений при создании
  */
 const getInitialValues = (): HolidayCountryRequest => ({
     day: '',
     country_id: 643,
     type: 0,
     comment: ''
 });
 
 
 type Props = {
     holiday_country?: HolidayCountryRequest,
     onSave?: () => void;
     onClose?: () => void;
     modalMode: TypeFormMode;
 };
 
 export const Form: React.FC<Props> = memo(({ holiday_country, modalMode, onSave, onClose }) => {
     const { holidayCountryApi } = useApi();
 
     const getTitle = () => {
         if (modalMode === TypeFormMode.EDIT) return 'Редактирования записи';
         return 'Добавление новой записи';
     };

     //Сохранение доступно для добавления и редактирования
     const isSaveAvailable = [TypeFormMode.NEW, TypeFormMode.EDIT].includes(modalMode);
 
     const isReadOnlyMode = modalMode === TypeFormMode.VIEW;
 
     const initialValues = useMemo(() => holiday_country?.day ? holiday_country : getInitialValues(), [holiday_country]);
     //  radioButton заполняет values.type
     const [dayOnOff, setDayOnOff] = React.useState(0);
     const handleDayOffChange = () => {
      setDayOnOff(0);
    };
    const handleDayOnChange = () => {
      setDayOnOff(1);
    }; 

    const initialDaysValue = ['Выходной', 'Рабочий']
     /**
      * Сохраняем данные
      * @param values Значения формы
      */
     /* const handleSubmit = async (values: HolidayCountryRequest) => { }; */
     const handleSubmit = async (values: HolidayCountryRequest) => {

      values.type = dayOnOff
      // console.log('values = ', values);

      const strippedRequest = HolidayCountryRequestSchema.cast(values, {
       assert: true,
       stripUnknown: true,
   }) as HolidayCountryRequest;  // as HolidayCountryRequest
         
         //обращение к сервису сохранения данных
         await holidayCountryApi
             .story(strippedRequest)
             .then(() => void onSave?.())
             .catch(console.error);
     };

     return (
         <>
             <Formik
                 initialValues={initialValues}
                 onSubmit={handleSubmit}
                 validationSchema={HolidayCountryRequestSchema()}
                 validateOnChange={false}
                 enableReinitialize
             >
                 {({
                     errors,
                     handleChange,
                     setFieldError,
                     setFieldValue,
                     values,
                     isSubmitting,

                 }: FormikProps<HolidayCountryRequest>) => {
                    //  console.log(errors);
                     return (
                         <ModalStyled width='617px' closeOnEscapeKeyDown onClose={onClose}>
                             <ModalTitle id='modal-title'>{getTitle()}</ModalTitle>
                             <ModalContentStyled>
                                 <FormStyled id='create-holiday_country'>
                                    <FormRow>
                                        <DateField 
                                            data-at='input-day'
                                            id='day'
                                            required
                                            label='Введите дату'
                                            style={{ 
                                                    width: '300px'
                                                }}
                                            dimension='s'
                                            status={
                                                errors.day ? 'error' : undefined
                                            }
                                            value={values.day}
                                            readOnly={
                                                isReadOnlyMode
                                            }
                                            onFocus={() => setFieldError('day', undefined)}
                                            onChange={handleChange}
                                        /> 
                                        <ThemeProvider theme={LIGHT_THEME}>
                                          <div role="group" aria-labelledby="dayOnOff-radio-group" style={{ marginTop: '28px', marginRight: '10px' }}>
                                            <div style={{ marginTop: '-33px'}}> Тип дня ({initialDaysValue[dayOnOff]}) </div>
                                              <div style={{ marginTop: '10px'}}>
                                                <RadioButton dimension='s' name="radio" data-at='input-type' onChange={handleDayOffChange}>Выходной</RadioButton>
                                                <RadioButton dimension='s' name="radio" data-at='input-type' onChange={handleDayOnChange}>Рабочий</RadioButton>
                                              </div>
                                          </div>
                                        </ThemeProvider>  
                                         {/* <InputField
                                             data-at='input-type'
                                             id='type'
                                             maxLength={2}
                                             required
                                             label='Тип дня'
                                             style={{
                                                 width: '100px'
                                             }}
                                             dimension='s'
                                             status={
                                                 errors.type ? 'error' : undefined
                                             }
                                             extraText={
                                                 errors.type ?? undefined
                                             }
                                             value={Number(values.type)}
                                             readOnly={
                                                 isReadOnlyMode
                                             }
                                             onFocus={() => setFieldError('type', undefined)}
                                             onChange={handleChange}
                                         /> */}
                                     </FormRow>
                                     

                                     {/* <FormRow>
                                          <div>
                                                <CheckboxField
                                                    data-at='input-type'
                                                    id='type'
                                                    required
                                                    dimension='s'
                                                    extraText={
                                                        errors.type ?? undefined
                                                    }
                                                    checked={values.type}
                                                    readOnly={
                                                        isReadOnlyMode
                                                    }
                                                    onFocus={() => setFieldError('type', undefined)}
                                                    onChange={handleChange}
                                                >Выходной</CheckboxField>
                                            </div>
                                     </FormRow> */}

                                     <FormRow>
                                         <InputField
                                             data-at='input-country_id'
                                             id='country_id'
                                             required
                                             maxLength={3}
                                             label='Код Страны'
                                             style={{
                                                 width: '548px'
                                             }}
                                             dimension='s'
                                             status={
                                                 errors.country_id ? 'error' : undefined
                                             }
                                             extraText={
                                                 errors.country_id ?? undefined
                                             }
                                             value={Number(values.country_id)}
                                             readOnly={
                                                 isReadOnlyMode
                                             }
                                             onFocus={() => setFieldError('country_id', undefined)}
                                             onChange={handleChange}
                                         />
                                     </FormRow>
                                     <FormRow>
                                          <Label >Комментарий</Label> 
                                     </FormRow>         
                                     <FormRow>
                                            <TextArea 
                                                data-at='input-comment'
                                                id='comment'
                                                maxLength={100}
                                                rows = {2}
                                                style={{
                                                    width: '548px', marginTop: '-15px'
                                                }}
                                                dimension='s'
                                                status={
                                                    errors.comment ? 'error' : undefined
                                                }
                                                value={values.comment}
                                                readOnly={
                                                    isReadOnlyMode
                                                }
                                                onFocus={() => setFieldError('comment', undefined)}
                                                onChange={handleChange}
                                            />
                                     </FormRow>
                                 </FormStyled>
                             </ModalContentStyled>
                             <ModalButtonPanel>
                                 {isSaveAvailable ? (
                                     <Button
                                         dimension='s'
                                         type='submit'
                                         form='create-holiday_country'
                                         disabled={isSubmitting}
                                     >
                                         Сохранить
                                     </Button>
                                 ) : null}
                                 <Button dimension='s' appearance='secondary' onClick={onClose}>
                                     Отменить
                                 </Button>
                             </ModalButtonPanel>
                         </ModalStyled>
                     );
                 }}
             </Formik>
         </>
     );
 });
 
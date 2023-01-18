/**
 * Форма для добавления/редактирования/просмотра БИК
 */
import { useAuthorization } from '@vtb-ermo/authorization';
import { useNotifications } from '@vtb-ermo/notifications';
import { Button, DropDownItem, InputField, ModalButtonPanel, ModalTitle, DateField } from '@vtb/ui-kit3';
import { Formik } from 'formik';
import type { FormikProps } from 'formik/dist/types';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import type { BicRequest} from '~/shared/models';
import { bicLoadingError } from './messages';
import { useApi } from '~/shared/ApiContext';

import {
    FormRow,
    FormStyled,
    ModalContentStyled,
    ModalStyled
} from './styled';

import { TypeFormMode } from '~/constants/types';
import { bicRequestSchema } from './validation';

/**
 * Инициализация значений при создании
 */
const getInitialValues = ():BicRequest => ({
    bicCode:'',
    participantName:'',
    dateIn:''
});


type Props = {
    bic?: BicRequest,
    onSave?: () => void;
    onClose?: () => void;
    modalMode: TypeFormMode;
};

export const Form: React.FC<Props> = memo(({ bic, modalMode, onSave, onClose }) => {
    const { bicApi } = useApi();

    const getTitle = () => {
        if (modalMode === TypeFormMode.EDIT) return 'Редактирования записи';
        return 'Добавление новой записи';
    };

    //Сохранение доступно для добавления и редактирования
    const isSaveAvailable = [TypeFormMode.NEW, TypeFormMode.EDIT].includes(modalMode);

    const isReadOnlyMode = modalMode === TypeFormMode.VIEW;

    const initialValues = useMemo(
        () =>
            bic?.bicCode
                ? bic
                : getInitialValues(),
        [bic]
    );

    /**
     * Сохраняем данные
     * @param values Значения формы
     */
    const handleSubmit = async (values: BicRequest) => {

        const strippedRequest = bicRequestSchema.cast(values, {
            assert: true,
            stripUnknown: true,
        }) as BicRequest;
        //обращение к сервису охранения данных
        await bicApi
            .story(strippedRequest)
            .then(() => void onSave?.())
            .catch(console.error);
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={bicRequestSchema}
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
                }: FormikProps<BicRequest>) => {
                    console.log(errors);
                    return (
                        <ModalStyled width='617px' closeOnEscapeKeyDown onClose={onClose}>
                            <ModalTitle id='modal-title'>{getTitle()}</ModalTitle>
                            <ModalContentStyled>
                                <FormStyled id='create-bic'>
                                    <FormRow>
                                        <InputField 
                                            data-at='input-bic-code'
                                            id='bicCode'
                                            maxLength={10}
                                            required
                                            label='БИК'                                            
                                            style={{ 
                                                 width: '548px' }}
                                            dimension='s'
                                            status={
                                                errors.bicCode ? 'error' : undefined
                                            }
                                            extraText={
                                                errors.bicCode ?? undefined
                                            }
                                            value={values.bicCode}
                                            readOnly={
                                                isReadOnlyMode
                                            }
                                            onFocus={() => setFieldError('bicCode', undefined)}
                                            onChange={handleChange}
                                        /> 
                                    </FormRow>  
                                    <FormRow>
                                        <InputField required
                                            data-at='input-participant-name'
                                            id='participantName'
                                            maxLength={255}
                                            label='Наименование'
                                            style={{ 
                                                 width: '548px'}}
                                            dimension='s'
                                            extraText={
                                                errors.participantName ?? undefined
                                            }
                                            status={
                                                errors.participantName ? 'error' : undefined
                                            }
                                            value={values.participantName}
                                            readOnly={
                                                isReadOnlyMode
                                            }
                                            onFocus={() => setFieldError('participantName', undefined)}
                                            onChange={handleChange}
                                        /> 
                                    </FormRow> 
                                    <FormRow>
                                        <DateField 
                                            data-at='input-date-in'
                                            id='dateIn'
                                            label='Дата создания'
                                            style={{ 
                                                    width: '548px'
                                                 }}
                                            dimension='s'
                                            status={
                                                errors.dateIn ? 'error' : undefined
                                            }
                                            value={values.dateIn}
                                            readOnly={
                                                isReadOnlyMode
                                            }
                                            onFocus={() => setFieldError('dateIn', undefined)}
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
                                        form='create-bic'
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

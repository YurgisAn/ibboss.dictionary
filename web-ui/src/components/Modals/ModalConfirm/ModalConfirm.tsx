import { Button, Modal, ModalContent, ModalButtonPanel } from '@vtb/ui-kit3';
import React from 'react';

import { ModalTitleStyled } from '../styled';

import * as S from './styled';

type PropType = { open: boolean; onConfirm: () => void; onCancel: () => void; title?: string; text: string };

export const ModalConfirm: React.FC<PropType> = (props) => {
    const { open, onConfirm, onCancel, text, title = 'Подтвердите изменения' } = props;
    return (
        <>
            {open && (
                <Modal onClose={onCancel} aria-labelledby='modal-confirm'>
                    <ModalTitleStyled id='modal-confirm'>{title}</ModalTitleStyled>
                    <ModalContent>{text}</ModalContent>
                    <ModalButtonPanel>
                        <Button dimension='s' appearance='ghost' onClick={onCancel}>
                            Отменить
                        </Button>
                        <S.ButtonApply dimension='s' appearance='primary' onClick={onConfirm}>
                            Применить
                        </S.ButtonApply>
                    </ModalButtonPanel>
                </Modal>
            )}
        </>
    );
};

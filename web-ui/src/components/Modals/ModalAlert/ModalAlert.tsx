/**
 * Окно для алертов
 */
import { Button, Modal, ModalContent, ModalButtonPanel } from '@vtb/ui-kit3';
import React from 'react';

import { ModalTitleStyled } from '../styled';

type PropType = { open: boolean; onClose: () => void; title?: string; text: string };

export const ModalAlert: React.FC<PropType> = (props) => {
    const { open, onClose, text, title = 'Предупреждение' } = props;
    return (
        <>
            {open && (
                <Modal onClose={onClose} aria-labelledby='modal-alert'>
                    <ModalTitleStyled id='modal-alert'>{title}</ModalTitleStyled>
                    <ModalContent>{text}</ModalContent>
                    <ModalButtonPanel>
                        <Button dimension='s' appearance='ghost' onClick={onClose}>
                            Ок
                        </Button>
                    </ModalButtonPanel>
                </Modal>
            )}
        </>
    );
};

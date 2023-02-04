import { Button } from '@openvtb/react-ui-kit';
import { Modal, ModalContent, TextField } from '@vtb/ui-kit3';
import { Form } from 'formik';
import styled, { css } from 'styled-components';

export const FormStyled = styled(Form)`
    min-height: 230px;
`;

export const FormRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
`;

export const ModalStyled = styled(Modal)<{ width?: string, height?:string}>`
    ${({ width, height }) => css`
        width: ${width} !important;
        height:${height};
        box-sizing: border-box;
    `} : '';
    > div {
        padding-right: 16px;
    }
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const ModalContentStyled = styled(ModalContent)`
    padding: 0;
    position: relative;
`;

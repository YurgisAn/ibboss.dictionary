import { ReactComponent as CloseOutline } from '@openvtb/admiral-icons/build/service/CloseOutline.svg';
import styled from 'styled-components';

export const ExtendedFiltersContainer = styled.div`
    display: flex;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;

    :before {
        position: fixed;
        z-index: 9;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        content: '';
        background-color: ${({ theme }) => theme.color.basic.secondary};
        opacity: 0.6;
    }
`;

export const ExtendedFiltersContent = styled.div`
    z-index: 9;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 200px;
    padding: 24px 32px 32px 32px;
    background-color: ${({ theme }) => theme.color.background.primary};
`;

export const Title = styled.div`
    margin-bottom: 16px;
    font-weight: 550;
    font-size: 16px;
    line-height: 24px;
`;

export const FiltersForm = styled.form`
    display: grid;
    grid-template-columns: repeat(4, calc(25% - 18px));
    column-gap: 24px;
    row-gap: 16px;
`;

export const CheckBoxWrapper = styled.div`
    grid-row-start: 2;
    grid-row-end: 4;
    grid-column-start: 4;
    grid-column-end: 5;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin: 0 0 -22px 0;
`;

export const CheckBoxItem = styled.div`
    margin: 0 0 22px 0;
`;

export const ButtonsWrapper = styled.div`
    grid-column-start: 1;
    grid-column-end: 5;
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    button + button {
        margin-left: 16px;
    }
`;

export const CloseOutlineIcon = styled(CloseOutline)`
    position: absolute;
    top: 30px;
    right: 38px;
    height: 24px;
    cursor: pointer;
`;

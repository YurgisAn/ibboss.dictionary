import styled from 'styled-components';

export const HeaderContainer = styled.header`
    display: flex;
    height: 52px;
    width: 100%;
    padding-left: 32px;
    padding-right: 16px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.color.background.primary}; 
`;
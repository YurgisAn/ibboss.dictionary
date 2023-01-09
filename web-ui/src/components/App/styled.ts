import styled from 'styled-components';

export const AppContainer = styled.div`
    padding: 24px;
    background-color: ${({ theme }) => theme.color.background.primary};
    border-radius: 8px;
    h1 {
        margin: 0 0 16px 0;
        font-size: 24px;
        font-weight: 400;
    }
`;

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    height: 50px;
    border-top: 1px dashed ${({ theme }) => theme.color.text.tertiary};
`;
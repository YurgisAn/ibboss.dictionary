import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body, html {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        font-family: "VTB Group UI", sans-serif;
        color: ${({ theme }) => theme.color.text.primary};
        background-color: ${({ theme }) => theme.color.background.secondary};
    }
    header + div {
        padding: 12px 32px;
    }
    * {
      box-sizing: border-box;
    }
`;

export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;
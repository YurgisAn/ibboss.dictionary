import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body, html {
        margin: 0;
        padding: 0;
        font-family: "VTBGroupUI", "Inter", sans-serif;
        color: ${({ theme }) => theme.color.text.primary};
        background-color: ${({ theme }) => theme.color.background.secondary};
    }
`;
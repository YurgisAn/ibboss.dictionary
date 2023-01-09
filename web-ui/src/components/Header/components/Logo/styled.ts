import styled, { css } from 'styled-components';

import { ReactComponent as LogoImg } from '~/assets/img/logo.svg';

export const LogoImgStyled = styled(LogoImg)<{ color?: string }>`
    width: 80px;

    ${({ color }) =>
        color &&
        css`
            path:nth-of-type(1) {
                fill: ${color};
            }
        `} : '';
`;

export const LogoContainer = styled.div`
    display: flex;
    flex: 1;
    height: 32px;
`;

export const PrefixWrapper = styled.div`
    align-self: flex-end;
    margin-left: 4px;
    margin-bottom: -1px;
    font-size: 12px;
    color: ${({ theme }) => theme.color.text.secondary};
`;

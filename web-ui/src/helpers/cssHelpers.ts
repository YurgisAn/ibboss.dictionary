import { css } from 'styled-components';

export const cutTextWithDots = (widthPx: string, heightPx: string) => css`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: ${widthPx};
    height: ${heightPx};
`;

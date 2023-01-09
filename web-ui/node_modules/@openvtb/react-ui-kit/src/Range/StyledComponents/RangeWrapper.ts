import styled, { css } from 'styled-components';

export interface IRangeWrapper {
  width?: string | number;
}

export const RangeWrapper = styled.div<IRangeWrapper>`
  ${({ width }) => css`
    position: relative;
    width: ${typeof width === 'number' ? `${width}px` : width};
  `}
`;

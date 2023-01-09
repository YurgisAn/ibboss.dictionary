import styled, { css } from 'styled-components';

export const FileTextWrapper = styled.div`
  ${() => css`
    width: calc(100% - 52px);
    display: flex;
    z-index: 1;

    & > div {
      width: 100%;
    }
  `}
`;

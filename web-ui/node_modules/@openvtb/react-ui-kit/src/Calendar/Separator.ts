import styled from 'styled-components';

export const Separator = styled.div<{ height: number }>`
  ${({ height }) => `height: ${height}px;`}
`;

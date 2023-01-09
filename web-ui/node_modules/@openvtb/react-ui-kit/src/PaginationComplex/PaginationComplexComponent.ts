import styled from 'styled-components';

const HEIGHT = 40;
const MIN_WIDTH = 696;

export const PaginationComplexComponent = styled.div<{ mobile: boolean }>`
  display: flex;
  height: ${HEIGHT}px;
  justify-content: space-between;
  max-width: 100%;
  min-width: ${({ mobile }) => (mobile ? '100%' : `${MIN_WIDTH}px`)};
`;

import styled from 'styled-components';

export const Container = styled.div<{ mobile?: boolean }>`
  width: ${({ mobile }) => (mobile ? '100%' : '384px')};
`;

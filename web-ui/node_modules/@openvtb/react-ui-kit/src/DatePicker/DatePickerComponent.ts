import styled from 'styled-components';

export const DatePickerComponent = styled.div<{ width: string | number }>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  position: relative;
`;

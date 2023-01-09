import styled from 'styled-components';

export interface IWrapperProps {
  dataTestId?: string;
  width: string | number;
}

export const Wrapper = styled.div<IWrapperProps>`
  position: relative;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
`;

import styled from 'styled-components';

interface ISpacerProps {
  $size: number;
}

export const Spacer = styled.div<ISpacerProps>`
  height: 100%;
  width: ${({ $size }) => `${$size}px`};
`;

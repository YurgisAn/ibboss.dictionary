import styled from 'styled-components';

export type Size = 'big' | 'small';

const HEIGHT = {
  big: 40,
  small: 32,
};

export const TreeBranchComponent = styled.div<{ size: Size }>`
  align-items: center;
  display: flex;
  height: ${({ size }) => HEIGHT[size]}px;
`;

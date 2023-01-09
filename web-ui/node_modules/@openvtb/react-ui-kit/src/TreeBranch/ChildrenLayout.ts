import styled from 'styled-components';

import type { Size } from './TreeBranchComponent';

const PADDING_LEFT = {
  big: 40,
  small: 36,
};

interface IChildrenLayoutProps {
  size: Size;
}

export const ChildrenLayout = styled.div<IChildrenLayoutProps>`
  padding-left: ${({ size }) => PADDING_LEFT[size]}px;
`;

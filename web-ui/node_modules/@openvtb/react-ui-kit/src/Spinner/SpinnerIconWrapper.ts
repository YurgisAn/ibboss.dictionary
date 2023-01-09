import styled, { keyframes } from 'styled-components';

import { Z_INDEXES } from '../common';

const SIZE = {
  big: 48,
  medium: 24,
  small: 16,
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export type Size = 'big' | 'medium' | 'small';

export const SpinnerIconWrapper = styled.div<{ size: Size }>`
  animation: ${spin} 1s linear infinite;
  height: ${({ size }) => SIZE[size]}px;
  width: ${({ size }) => SIZE[size]}px;
  z-index: ${Z_INDEXES.OVERLAY_SPINNER};
`;

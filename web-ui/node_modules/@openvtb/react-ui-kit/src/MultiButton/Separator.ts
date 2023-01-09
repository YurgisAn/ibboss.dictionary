import styled from 'styled-components';

import type { IMultiButtonProps } from './';

interface ISeparatorProps {
  size: IMultiButtonProps['size'];
}

const getSeparatorHeight = {
  big: '24px',
  medium: '24px',
  small: '20px',
  micro: '20px',
};

export const Separator = styled.div<ISeparatorProps>`
  position: relative;
  width: 1px;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    width: 1px;
    height: ${({ size = 'big' }) => getSeparatorHeight[size]};
  }
`;

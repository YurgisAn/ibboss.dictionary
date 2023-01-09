import styled from 'styled-components';

import { Direction } from './StepComponent';

interface IStepperComponentProps {
  width?: string | number;
  direction: Direction;
}

export const StepperComponent = styled.div<IStepperComponentProps>`
  outline: none;
  position: relative;
  display: flex;
  align-items: flex-start;
  ${({ width }) => (width ? `width: ${typeof width === 'number' ? `${width}px` : width}` : '')};
  ${({ direction }) =>
    direction === 'horizontal'
      ? `
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
  `
      : `
    flex-direction: column;
  `}
`;

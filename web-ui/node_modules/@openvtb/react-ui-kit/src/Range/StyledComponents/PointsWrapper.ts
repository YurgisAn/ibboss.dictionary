import styled from 'styled-components';

export interface IPointsWrapperProps {
  position: number;
}

export const PointsWrapper = styled.div<IPointsWrapperProps>`
  position: absolute;
  left: ${({ position }) => position}%;
  width: 12px;
  height: 12px;
  display: flex;
  border-radius: 50%;
  top: 1px;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%) translateY(-5px);
`;

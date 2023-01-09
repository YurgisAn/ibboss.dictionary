import styled from 'styled-components';

export interface ITrackWrapperProps {
  disabled?: boolean;
}

export const TrackWrapper = styled.div<ITrackWrapperProps>`
  position: relative;
  bottom: 10px;
  width: 100%;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  display: flex;
  align-items: center;
  height: 18px;
`;

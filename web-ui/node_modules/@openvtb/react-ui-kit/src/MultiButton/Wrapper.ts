import styled from 'styled-components';

interface IWrapperProps {
  disabled?: boolean;
}

export const Wrapper = styled.div<IWrapperProps>`
  display: flex;
  position: relative;
  z-index: 1;
  ${({ disabled }) => disabled && 'pointer-events: none;'}
`;

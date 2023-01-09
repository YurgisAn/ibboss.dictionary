import styled from 'styled-components';

const MARGIN_HORIZONTAL = 6;

interface IAdditionalContentLayoutProps {
  left?: boolean;
  right?: boolean;
}

export const AdditionalContentLayout = styled.div<IAdditionalContentLayoutProps>`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-left: ${({ right }: IAdditionalContentLayoutProps) => (right ? MARGIN_HORIZONTAL : 0)}px;
  margin-right: ${({ left }: IAdditionalContentLayoutProps) => (left ? MARGIN_HORIZONTAL : 0)}px;
`;

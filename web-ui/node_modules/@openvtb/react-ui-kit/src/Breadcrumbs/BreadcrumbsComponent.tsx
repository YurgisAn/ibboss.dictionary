import styled from 'styled-components';

export const HEIGHT = 20;
export const HEIGHT_SMALL = 16;

export const BreadcrumbsComponent = styled.div<{ small?: boolean }>`
  align-items: center;
  display: flex;
  height: ${({ small }) => (small ? HEIGHT_SMALL : HEIGHT)}px;
  outline: none;
`;

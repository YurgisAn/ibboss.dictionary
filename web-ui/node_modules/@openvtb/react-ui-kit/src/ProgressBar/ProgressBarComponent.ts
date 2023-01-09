import styled from 'styled-components';

const HEIGHT = {
  page: 28,
  top: 4,
};

const MIN_WIDTH = 140;

export type Kind = 'page' | 'top';

export const ProgressBarComponent = styled.div<{ kind: Kind }>`
  height: ${({ kind }) => HEIGHT[kind]}px;
  min-width: ${MIN_WIDTH}px;
  width: 100%;
`;

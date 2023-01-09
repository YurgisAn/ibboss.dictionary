import styled from 'styled-components';

import { Z_INDEXES, DEFAULT_THEME } from '../common';

export const Overlay = styled.div<{ opened?: boolean }>`
  ${({ opened }) => (opened ? '' : 'display: none;')};
  position: fixed;
  top: 0;
  left: 0;
  inset: 0px;
  z-index: ${Z_INDEXES.MODAL};
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease 0s;
  background: ${({ theme }) => theme.color.opacity.blackMedium};
`;

Overlay.defaultProps = {
  theme: DEFAULT_THEME,
};

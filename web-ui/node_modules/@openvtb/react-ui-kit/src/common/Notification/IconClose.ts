import styled from 'styled-components';

import { DEFAULT_THEME } from '../default-theme';
import { markerStyle } from '../marker';

import { ICON_CLOSE_RIGHT, ICON_CLOSE_TOP } from './constants';

export const IconClose = styled.div<{ markerOffset: number; inverse?: boolean }>`
  position: absolute;
  right: ${ICON_CLOSE_RIGHT}px;
  top: ${ICON_CLOSE_TOP}px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  ${({ theme, markerOffset, inverse }) => markerStyle(theme, markerOffset, inverse)}
`;

IconClose.defaultProps = {
  theme: DEFAULT_THEME,
};

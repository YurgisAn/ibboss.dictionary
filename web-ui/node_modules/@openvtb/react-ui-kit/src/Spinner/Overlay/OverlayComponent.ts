import styled from 'styled-components';

import { DEFAULT_THEME, Z_INDEXES } from '../../common';
import type { ITheme } from '../../themes';

export interface IOverlayComponentProps {
  inverse?: boolean;
  transparent?: boolean;
}

const getBackgroundColor = ({
  inverse,
  theme,
  transparent,
}: {
  inverse?: boolean;
  theme: ITheme;
  transparent?: boolean;
}) => {
  if (transparent) return 'transparent';
  return inverse ? theme.color.opacity.blackMedium : theme.color.opacity.whiteMedium;
};

export const OverlayComponent = styled.div<IOverlayComponentProps>`
  align-items: center;
  background-color: ${({ inverse, theme, transparent }) =>
    getBackgroundColor({ inverse, theme, transparent })};
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: ${Z_INDEXES.OVERLAY};
`;

OverlayComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

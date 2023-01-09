import styled from 'styled-components';

import { DEFAULT_THEME } from '../../../common';
import {
  ICON_SIZE_MICRO,
  ICON_SIZE_DEFAULT,
  COINS_WIDTH_MICRO,
  COINS_WIDTH_DEFAULT,
} from '../../constants';
import { getSuffixPadding } from '../utils-style';
import type { Size } from '../../common';

export interface ISuffixProps {
  position: number;
  size: Size;
  disabled?: boolean;
  withCoins?: boolean;
}

export const Suffix = styled.span<ISuffixProps>`
  ${({ size, disabled, theme, position, withCoins }) => `
  position: absolute;
  top: ${getSuffixPadding(size)}px;
  left: ${
    size === 'micro'
      ? position + ICON_SIZE_MICRO + 2 + (withCoins ? COINS_WIDTH_MICRO : 0)
      : position + ICON_SIZE_DEFAULT + (withCoins ? COINS_WIDTH_DEFAULT : 0)
  }px;
  color: ${disabled ? theme.color.neutral[30] : theme.color.neutral[50]};
  background: transparent;
`}
`;

Suffix.defaultProps = {
  theme: DEFAULT_THEME,
};

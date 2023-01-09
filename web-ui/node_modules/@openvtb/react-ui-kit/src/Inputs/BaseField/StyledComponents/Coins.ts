import styled from 'styled-components';

import { DEFAULT_THEME } from '../../../common';
import { getCoinsPadding } from '../utils-style';
import { Size } from '../../common/types';
import { TYPOGRAPHY } from '../../../Typography';
import { INPUT_PADDING } from '../../constants';

export interface ISeparatorDotProps {
  position: number;
  size: Size;
  disabled?: boolean;
}

export const SeparatorDot = styled.span<ISeparatorDotProps>`
  ${({ size, disabled, theme, position }) => `
  position: absolute;
  left: ${position + INPUT_PADDING + 2}px;
  top: ${getCoinsPadding(size)}px;
  color: ${disabled ? theme.color.neutral[30] : theme.color.neutral[50]};
  background: transparent;
  font-size: ${size === 'micro' ? TYPOGRAPHY.fontSize[14] : TYPOGRAPHY.fontSize[16]};
  line-height: ${size === 'micro' ? TYPOGRAPHY.lineHeight[20] : TYPOGRAPHY.lineHeight[24]};
`}
`;

SeparatorDot.defaultProps = {
  theme: DEFAULT_THEME,
};

export interface ICoinsProps {
  position: number;
  dimension: Size;
  disabled?: boolean;
}

export const Coins = styled.span<ICoinsProps>`
  ${({ dimension, disabled, theme, position }) => `
  position: absolute;
  left: ${position + INPUT_PADDING + 5}px;
  top: ${getCoinsPadding(dimension)}px;
  color: ${disabled ? theme.color.neutral[30] : theme.color.neutral[50]};
  background: transparent;
  outline: 0px solid transparent;
  font-size: ${dimension === 'micro' ? TYPOGRAPHY.fontSize[14] : TYPOGRAPHY.fontSize[16]};
  line-height: ${dimension === 'micro' ? TYPOGRAPHY.lineHeight[20] : TYPOGRAPHY.lineHeight[24]};
  ${disabled ? 'cursor: default' : ''};
`}
`;

Coins.defaultProps = {
  theme: DEFAULT_THEME,
};

import styled, { css } from 'styled-components';

import type { ITheme } from '../../../themes';
import { DEFAULT_THEME } from '../../../common';

const getColorText = (theme: ITheme, mobile = false, disabled = false) => {
  if (disabled) return theme.color.neutral[30];
  if (mobile) return theme.color.neutral.white;
  return theme.color.primary[60];
};

export const DropzoneText = styled.div<{ mobile?: boolean; disabled?: boolean }>`
  ${({ theme, mobile, disabled }) => css`
    color: ${getColorText(theme, mobile, disabled)};
    transition: all 0.2s;
    padding-left: ${mobile ? 10 : 0}px;
  `}
`;

DropzoneText.defaultProps = {
  theme: DEFAULT_THEME,
};

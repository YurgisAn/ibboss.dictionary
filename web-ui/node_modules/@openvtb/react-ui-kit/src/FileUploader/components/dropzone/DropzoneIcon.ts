import styled, { css } from 'styled-components';

import type { ITheme } from '../../../themes';
import { DEFAULT_THEME } from '../../../common';

const getColorIcon = (theme: ITheme, mobile = false, disabled = false) => {
  if (disabled && mobile) return theme.color.neutral[30];
  if (mobile) return theme.color.neutral.white;
  return theme.color.primary[60];
};

export const DropzoneIcon = styled.div<{ mobile?: boolean; disabled?: boolean }>`
  ${({ theme, mobile, disabled }) => css`
    display: flex;
    justify-content: center;
    align-items: ${mobile ? 'center' : 'baseline'};
    & svg {
      fill: ${getColorIcon(theme, mobile, disabled)};
    }
  `}
`;

DropzoneIcon.defaultProps = {
  theme: DEFAULT_THEME,
};

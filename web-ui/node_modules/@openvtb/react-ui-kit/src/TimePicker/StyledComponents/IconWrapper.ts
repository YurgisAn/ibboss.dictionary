import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';

export interface IIconWrapper {
  active?: boolean;
  disabled?: boolean;
}

const getIconColor = (theme, active, disabled) => {
  if (disabled) return theme.color.neutral[30];
  if (active) return theme.color.primary[60];
  return theme.color.neutral[50];
};

export const IconWrapper = styled.div<IIconWrapper>`
  ${({ theme, active, disabled }) => css`
    cursor: ${disabled ? 'default' : 'pointer'};
    & svg {
      fill: ${getIconColor(theme, active, disabled)};
      ${disabled
        ? ''
        : `
      &:hover {
        fill: ${theme.color.primary[60]};
      }    
    `}
    }
  `}
`;

IconWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

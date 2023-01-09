import { css } from 'styled-components';

import type { ITheme } from '../../themes';

export const outlined = ({
  active,
  disabled,
  theme,
}: {
  active: boolean;
  disabled: boolean;
  theme: ITheme;
}) => css`
  border-color: ${active ? theme.color.neutral[50] : 'transparent'};
  color: ${active ? theme.color.neutral[90] : ''};

  & div svg {
    fill: ${active ? theme.color.neutral[90] : ''};
  }

  &:hover {
    background: ${active || disabled ? '' : theme.color.neutral[10]};
  }

  &:focus {
    &::after {
      border-color: ${theme.color.primary[60]};
    }
  }
`;

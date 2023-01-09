import { css } from 'styled-components';

import type { ITheme } from '../../themes';

export const solid = ({
  active,
  disabled,
  theme,
}: {
  active: boolean;
  disabled: boolean;
  theme: ITheme;
}) => css`
  background: ${active ? theme.color.neutral[70] : ''};
  border-color: transparent;
  color: ${active ? theme.color.neutral.white : ''};

  & div svg {
    fill: ${active ? theme.color.neutral.white : ''};
  }

  &:hover {
    background: ${active || disabled ? '' : theme.color.neutral[20]};
  }
`;

import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../../common';
import { ICON_PADDING_RIGHT } from '../../constants';

export interface IUserIconProps {
  disabled?: boolean;
}

export const UserIcon = styled.div<IUserIconProps>`
  ${({ theme, disabled }) => css`
    padding-right: ${ICON_PADDING_RIGHT}px;
    cursor: ${disabled ? 'default' : 'pointer'};
    display: flex;

    & svg {
      fill: ${disabled ? theme.color.neutral[30] : theme.color.neutral[50]};

      &:hover {
        fill: ${disabled ? theme.color.neutral[30] : theme.color.primary[60]};
      }
    }
  `}
`;

UserIcon.defaultProps = {
  theme: DEFAULT_THEME,
};

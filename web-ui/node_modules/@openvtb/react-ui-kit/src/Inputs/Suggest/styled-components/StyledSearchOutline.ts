import styled, { css } from 'styled-components';

import { getDefaultIconStyled } from '../../common/utils/utils-style';
import { IStyledIconDefaultProps } from '../../common/interface/iStyledIconDefaultProps';
import { DEFAULT_THEME } from '../../../common';

export const StyledSearchOutline = styled.div<IStyledIconDefaultProps>`
  ${({ theme, disabled }) => css`
    display: flex;
    align-items: center;
    & svg {
      ${getDefaultIconStyled(theme, disabled)}
      &:hover {
        fill: ${disabled ? theme.color.neutral[30] : theme.color.primary[50]};
      }
    }
  `}
`;

StyledSearchOutline.defaultProps = {
  theme: DEFAULT_THEME,
};

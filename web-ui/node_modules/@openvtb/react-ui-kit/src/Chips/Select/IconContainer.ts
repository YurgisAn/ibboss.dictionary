import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';

import { getIconColor } from './styleUtils';

export interface IIconContainerProps {
  disabled?: boolean;
  selected?: boolean;
}

export const IconContainer = styled.div<IIconContainerProps>`
  ${({ theme, disabled, selected }) => css`
    display: flex;
    justify-content: center;
    & svg {
      fill: ${getIconColor(theme, selected, disabled)};
    }
  `}
`;

IconContainer.defaultProps = {
  theme: DEFAULT_THEME,
};

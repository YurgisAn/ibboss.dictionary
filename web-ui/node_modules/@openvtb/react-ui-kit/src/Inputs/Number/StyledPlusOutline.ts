import styled, { css } from 'styled-components';

import { ReactComponent as PlusOutline } from '../../Icons/service/PlusOutline.svg';
import { DEFAULT_THEME } from '../../common';
import { getDefaultIconStyled, IStyledIconDefaultProps } from '../common';

export const StyledPlusOutline = styled(PlusOutline)<IStyledIconDefaultProps>`
  ${({ theme, disabled }) => css`
    ${getDefaultIconStyled(theme, disabled)}
  `}
`;

StyledPlusOutline.defaultProps = {
  theme: DEFAULT_THEME,
};

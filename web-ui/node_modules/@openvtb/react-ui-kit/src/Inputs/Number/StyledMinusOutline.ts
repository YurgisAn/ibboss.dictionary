import styled, { css } from 'styled-components';

import { ReactComponent as MinusOutline } from '../../Icons/service/MinusOutline.svg';
import { getDefaultIconStyled, IStyledIconDefaultProps } from '../common';
import { DEFAULT_THEME } from '../../common';

export const StyledMinusOutline = styled(MinusOutline)<IStyledIconDefaultProps>`
  ${({ theme, disabled }) => css`
    ${getDefaultIconStyled(theme, disabled)}
  `}
`;

StyledMinusOutline.defaultProps = {
  theme: DEFAULT_THEME,
};

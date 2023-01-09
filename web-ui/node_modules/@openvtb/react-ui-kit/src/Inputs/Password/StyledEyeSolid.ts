import styled, { css } from 'styled-components';

import { ReactComponent as EyeSolid } from '../../Icons/service/EyeSolid.svg';
import { IStyledIconDefaultProps, getDefaultIconStyled } from '../common';
import { DEFAULT_THEME } from '../../common';

export const StyledEyeSolid = styled(EyeSolid)<IStyledIconDefaultProps>`
  ${({ theme, disabled }) => css`
    display: inline-flex;
    vertical-align: middle;
    ${getDefaultIconStyled(theme, disabled)}
  `}
`;

StyledEyeSolid.defaultProps = {
  theme: DEFAULT_THEME,
};

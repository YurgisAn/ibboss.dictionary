import styled, { css } from 'styled-components';

import { ReactComponent as EyeCloseOutline } from '../../Icons/service/EyeCloseOutline.svg';
import { getDefaultIconStyled, IStyledIconDefaultProps } from '../common';
import { DEFAULT_THEME } from '../../common';

export const StyledEyeCloseOutline = styled(EyeCloseOutline)<IStyledIconDefaultProps>`
  ${({ theme, disabled }) => css`
    ${getDefaultIconStyled(theme, disabled)}
  `}
`;

StyledEyeCloseOutline.defaultProps = {
  theme: DEFAULT_THEME,
};

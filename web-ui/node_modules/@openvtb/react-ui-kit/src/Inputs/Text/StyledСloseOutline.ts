import styled, { css } from 'styled-components';

import { ReactComponent as CloseOutline } from '../../Icons/service/CloseOutline.svg';
import { getDefaultIconStyled, IStyledIconDefaultProps } from '../common';
import { DEFAULT_THEME } from '../../common';

export const StyledСloseOutline = styled(CloseOutline)<IStyledIconDefaultProps>`
  ${({ theme, disabled }) => css`
    position: relative;
    display: inline-flex;
    vertical-align: middle;
    box-sizing: border-box;
    ${getDefaultIconStyled(theme, disabled)}
  `}
`;

StyledСloseOutline.defaultProps = {
  theme: DEFAULT_THEME,
};

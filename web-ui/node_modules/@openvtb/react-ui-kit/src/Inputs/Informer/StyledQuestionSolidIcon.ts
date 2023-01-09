import styled from 'styled-components';

import { getDefaultIconStyled, IStyledIconDefaultProps } from '../common';
import { DEFAULT_THEME } from '../../common';

export const StyledQuestionSolidIcon = styled.div<IStyledIconDefaultProps>`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  box-sizing: border-box;
  & svg {
    ${({ theme, disabled, active }) => getDefaultIconStyled(theme, disabled, active)}
  }
`;

StyledQuestionSolidIcon.defaultProps = {
  theme: DEFAULT_THEME,
};

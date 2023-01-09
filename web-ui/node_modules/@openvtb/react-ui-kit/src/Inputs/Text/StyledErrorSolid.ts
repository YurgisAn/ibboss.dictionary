import styled from 'styled-components';

import { DEFAULT_THEME } from '../../common';
import { ReactComponent as ErrorSolid } from '../../Icons/service/ErrorSolid.svg';

export interface IStyledErrorSolidProps {
  $active: boolean;
}

export const StyledErrorSolid = styled(ErrorSolid)<IStyledErrorSolidProps>`
  ${({ $active, theme }) => `
    position: relative;
    display: inline-flex;
    vertical-align: middle;
    box-sizing: border-box;
    fill: ${$active ? theme.color.neutral[50] : theme.color.error[60]};
  `}
`;

StyledErrorSolid.defaultProps = {
  theme: DEFAULT_THEME,
};

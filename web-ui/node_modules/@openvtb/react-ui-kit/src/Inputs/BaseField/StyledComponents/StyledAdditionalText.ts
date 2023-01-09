import styled, { css } from 'styled-components';

import type { Status } from '../../common';
import { DEFAULT_THEME } from '../../../common';
import { getAdditionalTextColor } from '../utils-style';
import { TEXT_MARGIN } from '../../constants';
export interface IStyledAditionalTextProps {
  status: Status;
  disabled?: boolean;
  focused?: boolean;
}

export const StyledAdditionalText = styled.div<IStyledAditionalTextProps>`
  ${({ status, disabled, theme, focused }) => css`
    color: ${getAdditionalTextColor(status, theme, disabled, focused)};
    margin-top: ${TEXT_MARGIN}px;
    word-break: break-all;
  `}
`;

StyledAdditionalText.defaultProps = {
  theme: DEFAULT_THEME,
};

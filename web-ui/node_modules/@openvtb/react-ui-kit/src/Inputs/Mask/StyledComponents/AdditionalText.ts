import styled, { css } from 'styled-components';

import { getAdditionalTextColor } from '../../BaseField/utils-style';
import { INPUT_TEXT_MARGIN } from '../constants';
import { DEFAULT_THEME } from '../../../common';
import type { Status } from '../../common';

export interface IStyledAditionalTextProps {
  status: Status;
  disabled?: boolean;
  focused?: boolean;
}

export const AdditionalText = styled.div<IStyledAditionalTextProps>`
  ${({ status, disabled, theme, focused }) => css`
    color: ${getAdditionalTextColor(status, theme, disabled, focused)};
    padding-top: ${INPUT_TEXT_MARGIN}px;
    word-break: break-all;
  `}
`;

AdditionalText.defaultProps = {
  theme: DEFAULT_THEME,
};

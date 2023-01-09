import styled from 'styled-components';

import type { Size } from '../common';
import { ICON_PADDING_INPUT_NUMBER_SMALL, ICON_PADDING_INPUT_NUMBER_DEFAULT } from '../constants';

export interface IIconWrapper {
  size?: Size;
}

export const IconWrapper = styled.div<IIconWrapper>`
  display: flex;
  justify-content: space-between;
  width: ${({ size }) =>
    size === 'micro'
      ? `${ICON_PADDING_INPUT_NUMBER_SMALL}px`
      : `${ICON_PADDING_INPUT_NUMBER_DEFAULT}px`};
`;

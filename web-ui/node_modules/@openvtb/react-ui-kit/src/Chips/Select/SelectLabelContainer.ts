import styled, { css } from 'styled-components';

import { TEXT_WIDTH_BIG, TEXT_WIDTH_SMALL } from '../common/constants';
import { Size } from '../common/common';

interface ISelectLabelContainerProps {
  size: Size;
  withIcon: boolean;
  width?: number | string;
}

export const SelectLabelContainer = styled.div<ISelectLabelContainerProps>`
  ${({ size, width, withIcon }) => css`
    display: flex;
    justify-content: center;
    width: ${typeof width === 'number' ? `${width}px` : width};
    max-width: ${size === 'big' ? TEXT_WIDTH_BIG : TEXT_WIDTH_SMALL};
    ${withIcon ? 'margin-left: 6px;' : ''};
  `}
`;

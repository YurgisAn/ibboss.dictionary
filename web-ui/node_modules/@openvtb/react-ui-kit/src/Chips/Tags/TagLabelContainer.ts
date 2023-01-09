import styled, { css } from 'styled-components';

import { TEXT_WIDTH_BIG, TEXT_WIDTH_SMALL, PADDING_BIG, PADDING_SMALL } from '../common/constants';

import { Size } from './ChipTagItem';

interface ITagLabelContainerProps {
  size: Size;
  width?: number | string;
}

export const TagLabelContainer = styled.div<ITagLabelContainerProps>`
  ${({ size, width }) => css`
    width: ${typeof width === 'number' ? `${width}px` : width};
    max-width: ${size === 'big' ? TEXT_WIDTH_BIG : TEXT_WIDTH_SMALL};
    padding: ${size === 'big' ? PADDING_BIG : PADDING_SMALL};
  `}
`;

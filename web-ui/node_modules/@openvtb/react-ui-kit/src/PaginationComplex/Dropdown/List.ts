import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';

import { HEIGHT as DROPDOWN_HEIGHT } from './DropdownComponent';

const PADDING_VERTICAL = 8;

export type Direction = 'bottom' | 'top';

interface IListProps {
  $direction: Direction;
  $opened: boolean;
}

export const List = styled.div<IListProps>`
  ${({ $direction, $opened, theme }) => css`
    background: ${theme.color.neutral.white};
    border-radius: ${$direction === 'bottom'
      ? `0 0 ${theme.borderRadius} ${theme.borderRadius}`
      : theme.borderRadius};
    box-shadow: ${$direction === 'bottom' ? theme.boxShadow[8] : theme.boxShadow[12]};
    left: 0;
    padding: ${PADDING_VERTICAL}px 0;
    position: absolute;
    ${!$opened && 'display: none;'}
    width: 100%;
    ${$direction === 'bottom' ? `top: ${DROPDOWN_HEIGHT}px;` : `bottom: ${DROPDOWN_HEIGHT}px;`};
  `};
  max-height: 236px;
  overflow: auto;
`;

List.defaultProps = {
  theme: DEFAULT_THEME,
};

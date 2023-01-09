import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';

import { PADDING_HORIZONTAL } from './DropdownComponent';

const HEIGHT = 32;

interface IItemProps {
  focused: boolean;
  selected: boolean;
}

const getItemColor = ({ focused, selected, theme }) => {
  if (focused) return theme.color.primary[60];
  if (selected) return theme.color.neutral[30];
  return 'inherit';
};

export const Item = styled.div<IItemProps>`
  ${({ focused, selected, theme }) => css`
    align-items: center;
    background: ${focused ? theme.color.neutral[5] : 'inherit'};
    color: ${getItemColor({ focused, selected, theme })};
    display: flex;
    height: ${HEIGHT}px;
    justify-content: flex-start;
    padding: 0 ${PADDING_HORIZONTAL}px;
    width: 100%;
  `};
`;

Item.defaultProps = {
  theme: DEFAULT_THEME,
};

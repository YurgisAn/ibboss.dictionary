import styled, { css } from 'styled-components';

import { MENU_WRAPPER_Z_INDEX } from '../constants';
import { DEFAULT_THEME } from '../../../common';

export const MenuWrapper = styled.div<{
  menuMaxHeight: string | number;
  visible?: boolean;
}>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  width: 100%;
  max-height: ${({ menuMaxHeight }) =>
    typeof menuMaxHeight === 'string' ? menuMaxHeight : `${menuMaxHeight}px`};
  box-sizing: border-box;
  z-index: ${MENU_WRAPPER_Z_INDEX};
  ${({ theme }) => css`
    margin-top: ${theme.input.dropdownMenuPadding}px;
    border-radius: ${theme.borderRadius};
    background-color: ${theme.color.neutral.white};
    box-shadow: ${theme.boxShadow[12]};
  `}
`;

MenuWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

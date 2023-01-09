import styled, { css } from 'styled-components';

import { TYPOGRAPHY } from '../../Typography';
import { DEFAULT_THEME } from '../../common';
import { DROPDOWN_OFFSET, MENU_HEIGHT, MENU_TOP_BOTTOM_BORDER_PADDING } from '../constants';
import type { Size } from '../../Inputs/common/types';

export interface IStyledDropdownMenuWrapperProps {
  size: Size;
}

export const StyledDropdownMenuWrapper = styled.div<IStyledDropdownMenuWrapperProps>`
  ${({ size, theme }) => css`
    position: absolute;
    top: ${theme.input.borderWidthActive
      ? DROPDOWN_OFFSET[size] + theme.input.dropdownMenuPadding
      : DROPDOWN_OFFSET[size]}px;
    left: 0;
    width: 76px;
    height: 208px;
  `}
`;

StyledDropdownMenuWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

export interface IStyledDropdownScrollItem {
  active?: boolean;
}

export const StyledDropdownScrollItem = styled.div<IStyledDropdownScrollItem>`
  ${({ theme, active }) => css`
    width: 100%;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-family: ${TYPOGRAPHY.fontFamily};
    font-size: ${TYPOGRAPHY.fontSize[14]};
    font-weight: ${TYPOGRAPHY.fontWeight.regular};
    line-height: ${TYPOGRAPHY.lineHeight[20]};
    color: ${theme.color.neutral[90]};
    ${active ? `color: ${theme.color.primary[60]};` : ''}
    &:hover {
      color: ${theme.color.primary[60]};
      background: ${theme.color.neutral[5]};
    }
  `}
`;

StyledDropdownScrollItem.defaultProps = {
  theme: DEFAULT_THEME,
};

export const StyledDropdownScrollColumn = styled.div`
  ${({ theme }) => css`
    height: ${MENU_HEIGHT - 2 * MENU_TOP_BOTTOM_BORDER_PADDING}px;
    padding-top: 7px;
    padding-bottom: 7px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    background: ${theme.color.neutral.white};
    border-radius: ${theme.input.borderRadius}px;
    border-top: none;
    border: 1px solid ${theme.color.neutral[20]};
    font-family: ${TYPOGRAPHY.fontFamily};
    font-size: ${TYPOGRAPHY.fontSize[14]};
    font-weight: ${TYPOGRAPHY.fontWeight.regular};
    line-height: ${TYPOGRAPHY.lineHeight[20]};
    color: ${theme.color.neutral[90]};
  `}
`;

StyledDropdownScrollColumn.defaultProps = {
  theme: DEFAULT_THEME,
};

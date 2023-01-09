import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';
import {
  Size,
  OPTION_HEIGHT,
  OPTION_PADDING,
  MENU_MAX_HEIGHT,
  MENU_VERTICAL_PADDING,
  DROPDOWN_MARGIN_BOTTOM_TOP,
  BORDER_RADIUS,
  INPUT_BORDER_ACTIVE,
  INPUT_BORDER_ERROR,
  CONTROL_HEIGHT,
} from '../constants';

interface IOptionWrapperProps {
  size: Size;
  error?: boolean;
  disabled?: boolean;
}

interface IDropdownListWrapperProps {
  size: Size;
  error?: boolean;
  menuIsOpen: boolean;
  dropdownListBorders: boolean;
}

export const OptionContent = styled.div`
  pointer-events: none;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 4px 8px;
  width: 100%;
  align-items: center;
  & div:first-child {
    padding-right: 8px;
  }
`;

export const OptionWrapper = styled.div<IDropdownListWrapperProps>`
  position: absolute;
  width: 100%;
  &:focus {
    outline: none;
  }
  top: ${({ size }) => CONTROL_HEIGHT[size]};
  left: 0;
  z-index: 1000;
  cursor: pointer;
  align-items: center;
  white-space: pre-wrap;
  min-height: 24px;
  height: auto;
  max-height: ${({ size }) => `${MENU_MAX_HEIGHT[size]} !important`};
  visibility: ${({ menuIsOpen }) => (menuIsOpen ? 'visible' : 'hidden')};
  overflow-y: auto;
  padding: ${MENU_VERTICAL_PADDING} 0;

  ${({ dropdownListBorders, theme, error, size }) => css`
    ${theme.multiSelect.styledInput === 'frontCorp' &&
    `
    margin: ${dropdownListBorders ? '0' : DROPDOWN_MARGIN_BOTTOM_TOP} 0
      ${dropdownListBorders ? DROPDOWN_MARGIN_BOTTOM_TOP : '0'} 0;

    left: -${error ? INPUT_BORDER_ERROR : INPUT_BORDER_ACTIVE};

    top: ${
      parseInt(CONTROL_HEIGHT[size]) -
      parseInt(error ? INPUT_BORDER_ERROR : INPUT_BORDER_ACTIVE) +
      'px'
    };
    `}
  `}

  ${({ theme }) => css`
    border-radius: ${BORDER_RADIUS};
    background-color: ${theme.color.neutral.white};
    box-shadow: ${theme.boxShadow[12]};

    // Основная ширина полосы прокрутки.
    ::-webkit-scrollbar {
      width: 16px;
    }

    // Цвет дорожки, по которой двигается бегунок прокрутки.
    ::-webkit-scrollbar-track {
      background: ${theme.color.neutral.white};
      background-clip: content-box;
    }

    // Размер и цвет бегунка.
    ::-webkit-scrollbar-thumb {
      background: ${theme.color.neutral[30]};
      border: 6px solid ${theme.color.neutral.white};
      border-radius: 10px;
    }

    // Размер бегунка при наведении на него курсора.
    ::-webkit-scrollbar-thumb:hover {
      border: 5px solid ${theme.color.neutral.white};
    }
  `}

  ${({ dropdownListBorders, size, error, theme }) =>
    dropdownListBorders &&
    css`
      top: auto;
      bottom: ${theme.multiSelect.styledInput === 'frontCorp'
        ? parseInt(CONTROL_HEIGHT[size]) -
          parseInt(error ? INPUT_BORDER_ERROR : INPUT_BORDER_ACTIVE) +
          'px'
        : CONTROL_HEIGHT[size]};
    `}
`;

OptionWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

export const OptionCheckbox = styled.div<IOptionWrapperProps>`
  display: flex;
  align-items: center;
  width: 100%;
  ${({ theme, size, disabled }) => css`
    width: 100%;
    height: ${OPTION_HEIGHT[size]};
    padding: ${OPTION_PADDING[size]};
    cursor: ${disabled ? 'default' : 'pointer'};
    background-color: ${theme.color.neutral.white};
    color: ${disabled ? theme.color.neutral[30] : theme.color.neutral[90]};
  `}
  ${({ theme, disabled }) =>
    !disabled &&
    css`
      &:hover {
        color: ${theme.color.primary[60]};
        background-color: ${theme.color.neutral[5]};
      }
    `}
`;

OptionCheckbox.defaultProps = {
  theme: DEFAULT_THEME,
};

export const CheckboxWrapper = styled.div`
  pointer-events: none;
`;

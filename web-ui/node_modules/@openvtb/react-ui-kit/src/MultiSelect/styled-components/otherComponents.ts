import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';
import { Body2Short } from '../../Typography';
import {
  ADDITIONAL_TEXT_MARGIN_TOP,
  BOTTOM_LINE_HEIGHT_ON_FOCUS,
  CONTROL_HEIGHT,
  CONTROL_PADDING,
  LABEL_MARGIN_BOTTOM,
  Size,
  SelectType,
  BORDER_RADIUS,
} from '../constants';

interface ILabelProps {
  disabled?: boolean;
  menuIsOpen?: boolean;
}

interface IAdditionalTextProps {
  disabled?: boolean;
  error?: boolean;
  menuIsOpen?: boolean;
}

interface ISelectWrapperProps {
  width?: string;
}

interface ISelectContainerProps {
  error?: boolean;
  size: Size;
  menuIsOpen?: boolean;
  disabled?: boolean;
  type?: SelectType;
  dropdownListBorders: boolean;
}

export const SelectWrapper = styled.div<ISelectWrapperProps>`
  width: ${({ width }) => width};
`;

export const Label = styled(Body2Short)<ILabelProps>`
  margin-bottom: ${LABEL_MARGIN_BOTTOM};
  color: ${({ theme, disabled, menuIsOpen }) => {
    if (disabled) {
      return theme.color.neutral[30];
    }
    if (!menuIsOpen) {
      return theme.color.neutral[50];
    }
  }};
  &:focus {
    color: theme.color.neutral[90];
  }
  &:hover {
    color: theme.color.neutral[90];
  }
`;

Label.defaultProps = {
  theme: DEFAULT_THEME,
};

export const SelectContainer = styled.div<ISelectContainerProps>`
  display: flex;
  position: relative;
  &:focus {
    outline: none;
  }

  ${({ theme, disabled, menuIsOpen, size, type, error, dropdownListBorders }) => css`
    height: ${CONTROL_HEIGHT[size]};
    padding: ${CONTROL_PADDING(type)[size]};
    color: ${disabled ? theme.color.neutral[30] : theme.color.neutral[90]};
    border: 1px solid ${disabled ? theme.color.neutral[10] : theme.color.neutral[20]};
    border-radius: ${theme.multiSelect.styledInput === 'frontCorp'
      ? BORDER_RADIUS
      : theme.borderRadius};
    background: ${disabled ? theme.color.neutral[10] : theme.color.neutral.white};
    ${menuIsOpen &&
    !disabled &&
    theme.multiSelect.styledInput === 'frontCorp' &&
    `
      border: 2px solid ${!disabled ? theme.color.primary[60] : theme.color.neutral[10]};
    `}
    ${error &&
    !disabled &&
    !menuIsOpen &&
    theme.multiSelect.styledInput === 'frontCorp' &&
    `
      border: 1px solid ${theme.color.error[60]};
    `}
    ${!menuIsOpen &&
    !disabled &&
    `
      &:hover {
        background: ${theme.color.neutral[5]};
      }
    `}
    ${menuIsOpen &&
    !disabled &&
    theme.multiSelect.styledInput === 'light' &&
    `
      &:before {
        position: absolute;
        content: '';
        top: ${dropdownListBorders ? '-1px' : 'auto'};
        bottom: ${dropdownListBorders ? 'auto' : '-1px'};
        left: -1px;
        width: calc(100% + (1px * 2));
        height: ${BOTTOM_LINE_HEIGHT_ON_FOCUS};
        background: ${!disabled ? theme.color.primary[60] : theme.color.neutral[10]};
      }
    `}
  `}

  ${({ theme, menuIsOpen, error }) =>
    (menuIsOpen || error) &&
    css`
      border-radius: ${BORDER_RADIUS};
      &:before {
        background: ${error ? theme.color.error[60] : theme.color.primary[60]};
      }
    `}
`;

SelectContainer.defaultProps = {
  theme: DEFAULT_THEME,
};

export const AdditionalText = styled(Body2Short)<IAdditionalTextProps>`
  margin-top: ${ADDITIONAL_TEXT_MARGIN_TOP};
  color: ${({ theme, disabled, error, menuIsOpen }) => {
    if (disabled) {
      return theme.color.neutral[30];
    }
    if (error) {
      return theme.color.error[60];
    }
    if (!menuIsOpen) {
      return theme.color.neutral[50];
    }
  }};
  &:hover {
    color: theme.color.neutral[90];
  }
`;

AdditionalText.defaultProps = {
  theme: DEFAULT_THEME,
};

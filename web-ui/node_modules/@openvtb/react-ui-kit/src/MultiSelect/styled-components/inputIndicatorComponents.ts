import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../../common';
import type { ITheme } from '../../themes';
import { CLOSE_ICON_MARGIN_RIGHT } from '../constants';

interface IIconWrapperProps {
  menuIsOpen?: boolean;
  disabled?: boolean;
}

export const IndicatorsContainerWrapper = styled.div`
  align-self: stretch;
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  align-items: center;
`;

const commonIconStyles = (theme: ITheme, disabled?: boolean, menuIsOpen?: boolean) => css`
  cursor: pointer;
  fill: ${() => {
    if (disabled) return theme.color.neutral[30];
    if (menuIsOpen && !disabled) return theme.color.primary[60];
    return theme.color.neutral[50];
  }};
  &:hover {
    fill: ${!disabled && theme.color.primary[60]};
  }
`;

export const ArrowDownIcon = styled.div<IIconWrapperProps>`
  pointer-events: none;
  display: flex;
  & svg {
    ${({ theme, disabled, menuIsOpen }) => commonIconStyles(theme, disabled, menuIsOpen)}
  }
`;

ArrowDownIcon.defaultProps = {
  theme: DEFAULT_THEME,
};

export const CloseIcon = styled.div<IIconWrapperProps>`
  display: flex;
  margin-right: ${CLOSE_ICON_MARGIN_RIGHT};
  & svg {
    ${({ theme, disabled, menuIsOpen }) => commonIconStyles(theme, disabled, menuIsOpen)}
  }
`;

CloseIcon.defaultProps = {
  theme: DEFAULT_THEME,
};

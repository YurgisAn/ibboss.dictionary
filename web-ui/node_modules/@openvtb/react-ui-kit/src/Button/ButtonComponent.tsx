import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { KIND_STYLES } from './kind-styles';
import { calculatePadding, getWidth, BUTTON_SIZE } from './utils';

export type Kind = 'primary' | 'secondary' | 'ghost' | 'white' | 'danger' | 'success';
export type Size = 'big' | 'medium' | 'small' | 'micro';
export type ButtonBasicProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface IButtonComponentProps extends ButtonBasicProps {
  fullWidth: boolean;
  kind: Kind;
  multipleChildren: boolean;
  onlyIcon: boolean;
  rightIcon: boolean;
  size: Size;
}

export const ButtonComponent = styled.button<IButtonComponentProps>`
  ${({ fullWidth, kind, multipleChildren, onlyIcon, rightIcon, size, theme }) => css`
    align-items: center;
    border-radius: ${theme.borderRadius};
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: ${BUTTON_SIZE[size]}px;
    justify-content: center;
    outline: none;
    padding: ${onlyIcon ? 0 : calculatePadding({ multipleChildren, rightIcon, size, theme })};
    position: relative;
    width: ${getWidth({ fullWidth, onlyIcon, size })};
    ${KIND_STYLES[kind](theme)};

    &:focus {
      &::after {
        border-radius: ${theme.borderRadius};
        border-style: solid;
        border-width: 1px;
        bottom: 2px;
        content: '';
        display: block;
        left: 2px;
        position: absolute;
        right: 2px;
        top: 2px;
      }
    }

    &:disabled {
      cursor: default;
    }
  `};
`;

ButtonComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

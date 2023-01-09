import styled, { css } from 'styled-components';

import { TYPOGRAPHY } from '../Typography';
import { DEFAULT_THEME } from '../common';

export const Input = styled.input`
  ${({ theme }) => css`
    background: transparent;
    border-radius: ${theme.borderRadius};
    border: 2px solid transparent;
    box-sizing: border-box;
    color: ${theme.color.neutral[90]};
    font-family: ${TYPOGRAPHY.fontFamily};
    font-size: ${TYPOGRAPHY.fontSize[14]};
    font-weight: ${TYPOGRAPHY.fontWeight.regular};
    height: 40px;
    line-height: ${TYPOGRAPHY.lineHeight[20]};
    margin-left: 8px;
    outline: none;
    padding-left: 14px;
    width: 114px;
    -moz-appearance: textfield;

    &::placeholder {
      color: ${theme.color.primary[60]};
      font-weight: ${TYPOGRAPHY.fontWeight.medium};
      opacity: 1;
    }

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }

    &:hover {
      background: ${theme.color.opacity.blackHover};
    }

    &:focus {
      background: ${theme.color.neutral.white};
      border-color: ${theme.color.primary[60]};
    }
  `};
`;

Input.defaultProps = {
  theme: DEFAULT_THEME,
};

import styled, { css } from 'styled-components';
import { size as Size } from 'polished';

import { DEFAULT_THEME } from '../common';

import {
  RADIOBUTTON_MARGIN_BIG,
  RADIOBUTTON_MARGIN_SMALL,
  RADIOBUTTON_SIZE_BIG,
  RADIOBUTTON_SIZE_SMALL,
} from './constants';
import { MarkBeforeContainer } from './style-utils';
import type { RadioButtonSize } from './constants';

type MarkProps = {
  size: RadioButtonSize;
  disabled?: boolean;
};

export const Mark = styled.div<MarkProps>`
  border-radius: 50%;
  display: flex;
  flex: 0 0 auto;
  position: relative;
  ${({ size, theme, disabled }) => css`
    background-color: ${theme.color.neutral.white};
    border: 1px solid ${disabled ? theme.color.neutral[30] : theme.color.neutral[50]};
    margin: ${size === 'small' ? RADIOBUTTON_MARGIN_SMALL : RADIOBUTTON_MARGIN_BIG};
    ${size === 'small' ? Size(RADIOBUTTON_SIZE_SMALL) : Size(RADIOBUTTON_SIZE_BIG)};
  `}

  &:focus {
    outline: none;
  }

  &:before {
    background-color: transparent;
    border-radius: 50%;
    content: '';
    position: absolute;
    ${({ size }) => MarkBeforeContainer(size)};
  }

  &:after {
    background: transparent;
    border-radius: 50%;
    border: 0 solid transparent;
    content: '';
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.2s;
    ${Size('100%')}
  }
`;

Mark.defaultProps = {
  theme: DEFAULT_THEME,
};

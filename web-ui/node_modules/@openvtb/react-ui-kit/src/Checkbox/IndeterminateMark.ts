import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';

import { CheckboxSize } from './constants';
import { commonMarkStyle } from './style-utils';
import type { IInputProps } from './Input';

export interface ICommonProps extends IInputProps {
  size?: CheckboxSize;
  withLabel?: boolean;
}

export const IndeterminateMark = styled.div<ICommonProps>`
  ${({ theme, disabled, size, withLabel }) => css`
    ${commonMarkStyle(theme, size, true, withLabel)}
    background-color: ${disabled ? theme.color.neutral[30] : theme.color.primary[60]};
    border: 1px solid ${disabled ? theme.color.neutral[30] : theme.color.primary[60]};
    border-radius: ${theme.borderRadius};
  `}
`;

IndeterminateMark.defaultProps = {
  theme: DEFAULT_THEME,
};

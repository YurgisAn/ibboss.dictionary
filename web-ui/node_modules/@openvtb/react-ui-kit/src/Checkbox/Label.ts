import styled, { css } from 'styled-components';

import { DEFAULT_THEME } from '../common';
import type { ITheme } from '../themes';
import { Body2Short, Body1Short } from '../Typography';

import type { ICommonProps } from './IndeterminateMark';
import type { CheckboxSize } from './constants';

const commonLabelStyles = (theme: ITheme, disabled?: boolean) => css`
  display: flex;
  align-items: center;
  user-select: none;
  width: 100%;
  color: ${disabled ? theme.color.neutral[30] : theme.color.neutral[90]};

  &:focus {
    outline: none;
  }
`;

const SmallLabel = styled(Body2Short).attrs({ tabIndex: -1 })<ICommonProps>`
  ${({ theme, disabled }) => commonLabelStyles(theme, disabled)}
`;

SmallLabel.defaultProps = {
  theme: DEFAULT_THEME,
};

const BigLabel = styled(Body1Short).attrs({ tabIndex: -1 })<ICommonProps>`
  ${({ theme, disabled }) => commonLabelStyles(theme, disabled)}
`;

BigLabel.defaultProps = {
  theme: DEFAULT_THEME,
};

export const Label = (size: CheckboxSize) => (size === 'small' ? SmallLabel : BigLabel);

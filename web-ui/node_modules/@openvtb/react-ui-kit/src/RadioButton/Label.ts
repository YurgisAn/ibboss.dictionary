import styled, { css } from 'styled-components';

import { Body2Short, Body1Short } from '../Typography';
import { DEFAULT_THEME } from '../common';
import type { ITheme } from '../themes';

import { LABEL_PADDING } from './constants';
import type { RadioButtonSize } from './constants';

type LabelProps = {
  disabled?: boolean;
};

const commonLabelStyles = (theme: ITheme, disabled?: boolean) => css`
  padding: ${LABEL_PADDING};
  color: ${disabled ? theme.color.neutral[30] : theme.color.neutral[90]};
  user-select: none;
  &:focus {
    outline: none;
  }
`;

const SmallLabel = styled(Body2Short).attrs({ tabIndex: -1 })<LabelProps>`
  ${({ theme, disabled }) => commonLabelStyles(theme, disabled)}
`;

SmallLabel.defaultProps = {
  theme: DEFAULT_THEME,
};

const BigLabel = styled(Body1Short).attrs({ tabIndex: -1 })<LabelProps>`
  ${({ theme, disabled }) => commonLabelStyles(theme, disabled)}
`;

BigLabel.defaultProps = {
  theme: DEFAULT_THEME,
};

export const Label = (size: RadioButtonSize) => (size === 'small' ? SmallLabel : BigLabel);

import styled, { css } from 'styled-components';

import { Body2Short, Body1Short } from '../Typography';
import { DEFAULT_THEME } from '../common';
import type { ITheme } from '../themes';

import {
  RadioGroupSize,
  RADIOGROUP_MARGIN_BOTTOM_BIG,
  RADIOGROUP_MARGIN_BOTTOM_SMALL,
} from './constants';
import type { IRadioGroupWrapperProps } from './RadioGroupWrapper';

interface ILabelProps extends IRadioGroupWrapperProps {
  disabled?: boolean;
}

const commonLabelStyles = (theme: ITheme, size: RadioGroupSize, disabled?: boolean) => css`
  margin-bottom: ${size === 'small'
    ? RADIOGROUP_MARGIN_BOTTOM_SMALL
    : RADIOGROUP_MARGIN_BOTTOM_BIG};
  color: ${disabled ? theme.color.neutral[30] : theme.color.neutral[90]};
  user-select: none;
`;

const SmallLabel = styled(Body2Short)<ILabelProps>`
  ${({ theme, size, disabled }) => commonLabelStyles(theme, size, disabled)}
`;

SmallLabel.defaultProps = {
  theme: DEFAULT_THEME,
};

const BigLabel = styled(Body1Short)<ILabelProps>`
  ${({ theme, size, disabled }) => commonLabelStyles(theme, size, disabled)}
`;

BigLabel.defaultProps = {
  theme: DEFAULT_THEME,
};

export const Label = (size: RadioGroupSize) => (size === 'small' ? SmallLabel : BigLabel);

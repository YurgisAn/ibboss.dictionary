import styled, { css } from 'styled-components';

import { ICheckboxProps } from '../Checkbox';
import { DEFAULT_THEME } from '../common';
import type { ITheme } from '../themes';
import { Body1Short, Body2Short } from '../Typography';

import { ICheckboxGroupItemProps } from './CheckboxGroupItem';
import { ICheckboxGroupWrapperProps } from './CheckboxGroupWrapper';
import { ITEM_MARGIN_BOTTOM_BIG, ITEM_MARGIN_BOTTOM_SMALL } from './constants';

type CheckboxSize = ICheckboxProps['size'];
type ICheckboxGroupLabelProps = ICheckboxGroupWrapperProps & ICheckboxGroupItemProps;

const commonLabelStyle = (theme: ITheme, size?: CheckboxSize, disabled?: boolean) => css`
  color: ${disabled ? theme.color.neutral[30] : theme.color.neutral[90]};
  margin-bottom: ${size === 'small' ? ITEM_MARGIN_BOTTOM_SMALL : ITEM_MARGIN_BOTTOM_BIG};
`;

const SmallLabel = styled(Body2Short)<ICheckboxGroupLabelProps>`
  ${({ theme, size, disabled }) => commonLabelStyle(theme, size, disabled)}
`;

SmallLabel.defaultProps = {
  theme: DEFAULT_THEME,
};

const BigLabel = styled(Body1Short)<ICheckboxGroupLabelProps>`
  ${({ theme, size, disabled }) => commonLabelStyle(theme, size, disabled)}
`;

BigLabel.defaultProps = {
  theme: DEFAULT_THEME,
};

export const Label = (size: CheckboxSize) => (size === 'small' ? SmallLabel : BigLabel);

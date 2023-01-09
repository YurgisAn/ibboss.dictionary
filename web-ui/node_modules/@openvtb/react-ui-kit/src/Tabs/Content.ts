import styled, { css } from 'styled-components';

import { Body1Long, Body2Long } from '../Typography';
import { DEFAULT_THEME } from '../common';
import type { ITheme } from '../themes';

import {
  TabsSize,
  TAB_PADDING_LEFT_WITH_ICON,
  TAB_PADDING_RIGHT_WITH_BADGE,
  getPadding,
} from './constants';

interface ITabContentProps {
  icon: boolean;
  badge: boolean;
}

const commonTabContentStyles = (icon: boolean, badge: boolean, theme: ITheme) => css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: ${badge ? TAB_PADDING_RIGHT_WITH_BADGE : getPadding(theme)};
  padding-left: ${icon ? TAB_PADDING_LEFT_WITH_ICON : getPadding(theme)};
`;

const TabContentBig = styled(Body1Long).attrs({ tabIndex: -1 })<ITabContentProps>`
  ${({ icon, badge, theme }) => commonTabContentStyles(icon, badge, theme)}
`;

TabContentBig.defaultProps = {
  theme: DEFAULT_THEME,
};

const TabContentSmall = styled(Body2Long).attrs({ tabIndex: -1 })<ITabContentProps>`
  ${({ icon, badge, theme }) => commonTabContentStyles(icon, badge, theme)}
`;

TabContentSmall.defaultProps = {
  theme: DEFAULT_THEME,
};

export const Content = (size: TabsSize) => (size === 'small' ? TabContentSmall : TabContentBig);

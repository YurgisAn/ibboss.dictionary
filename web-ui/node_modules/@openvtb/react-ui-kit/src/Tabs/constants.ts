import { ITheme } from '../themes';

export type TabsSize = 'big' | 'small';

export const UNDERLINE_HEIGHT = '2px';
export const TAB_HEIGHT_SMALL = '40px';
export const TAB_HEIGHT_BIG = '48px';
export const TAB_PADDING_RIGHT_WITH_BADGE = '8px';
export const TAB_PADDING_LEFT_WITH_ICON = '8px';

export const getPadding = (theme: ITheme) => (theme.tabs.useMargin ? 0 : '20px');
export const getMargin = (size: TabsSize) => (size === 'big' ? '32px' : '24px');
export const getMenuMargin = (size: TabsSize, theme: ITheme) => {
  switch (size) {
    case 'big':
      return theme.tabs.useMargin ? '12px 12px 12px 44px' : '12px';
    case 'small':
      return theme.tabs.useMargin ? '8px 8px 8px 32px' : '8px';
  }
};

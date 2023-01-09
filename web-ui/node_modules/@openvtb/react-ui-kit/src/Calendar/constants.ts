export type LocaleType = 'ru' | 'enUS' | 'de';

export type Corners = {
  [key in 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right']?: boolean;
};

export type CalendarSize = 'big' | 'small';

export const SIZES = {
  big: 320,
  small: 248,
};

export const NAVIGATION_PANEL_SIZES = {
  big: 64,
  small: 52,
};

export const DAY_SIZES = {
  big: 40,
  small: 32,
};

export const DAY_PADDINGS = {
  big: 12,
  small: 8,
};

export const NAVIGATION_YEAR_SIZES = {
  big: 8,
  small: 6,
};

export const YEAR_SIZES = {
  big: 68,
  small: 56,
};

export const YEAR_PADDINGS = {
  big: 26,
  small: 20,
};

export const DAY_VIEW_PADDINGS = {
  big: '28px 20px 16px',
  small: '20px 12px 12px',
};

export const YEAR_VIEW_PADDINGS = {
  big: '28px 24px 16px',
  small: '20px 12px 12px',
};

export const HEADER_PADDINGS = {
  big: '26px 0px 28px 32px',
  small: '20px 0px 20px 20px',
};

export const PANEL_DAY_VIEW_PADDINGS = {
  big: '0 4px 28px 10px',
  small: '0 4px 20px 8px',
};

export const PANEL_YEAR_VIEW_PADDINGS = {
  big: '0 0 28px 6px',
  small: '0 4px 20px 8px',
};

export const DAY_NAMES_BOTTOM_MARGINS = {
  big: 12,
  small: 8,
};

export const DAY_NUMBERS = [0, 1, 2, 3, 4, 5, 6];

export const MENU_DAY = 'Выбор дня';
export const MENU_YEAR = 'Выбор года';

export const MENU_NEXT_YEAR = 'Вперед';
export const MENU_PREVIOUS_YEAR = 'Назад';

export const MENU_NEXT_MONTH = 'Следующий месяц';
export const MENU_PREVIOUS_MONTH = 'Предыдущий месяц';

export const DEFAULT_SIZE = 'big';
export const DEFAULT_YEAR_COUNT = 16;
export const DEFAULT_LOCALE_NAME = 'ru';

import { ElementType } from 'react';

import { TabsSize } from './constants';

export interface IOverflowTab {
  /** Уникальное значение вкладки */
  value: any;
  /** Надпись к вкладке */
  label: string;
  /** Активация вкладки */
  active?: boolean;
  /** Отключение вкладки */
  disabled?: boolean;
}

export interface ITab extends IOverflowTab {
  /** Иконка, которая будет добавлена к вкладке */
  icon?: ElementType;
  /** Значение компонента Badge, который будет добавлен к вкладке */
  badge?: number;
}

export interface IOverflowMenuProps {
  /** Массив дополнительных вкладок */
  list: IOverflowTab[];
  /** Отключение меню */
  disabled?: boolean;
}

export interface ITabsProps {
  /** Список вкладок */
  list: ITab[];
  /** Колбек на изменение выбранной вкладки */
  onChange: (item: ITab) => void;
  /** Ширина компонента, по умолчанию 100% */
  width?: string | number;
  /** Размер компонента */
  size?: TabsSize;
  /** Отключение серой полоски */
  underline?: boolean;
  /** Добавление компонента OverflowMenu для отображения дополнительных опций */
  overflowMenu?: IOverflowMenuProps;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Мобильный вид компонента */
  mobile?: boolean;
}

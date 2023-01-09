import { ReactNode } from 'react';

/** Вид устройства/разрешения для задания свойств */
export type Device = 'mobile320' | 'tablet768' | 'tablet1024' | 'desktop1280' | 'desktop1600';

export type JustifyContent =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-around'
  | 'space-between';
export type AlignItems = 'baseline' | 'center' | 'flex-start' | 'flex-end' | 'stretch';

export const Devices: Device[] = [
  'mobile320',
  'tablet768',
  'tablet1024',
  'desktop1280',
  'desktop1600',
];

export interface IGridBaseProps {
  /** Элементы содержимого */
  children?: ReactNode;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
}

/** Содержит размеры в количестве колонок, которое занимает данная ячейка на заданном устройстве/разрешении */
export interface IDevices {
  mobile320?: number;
  tablet768?: number;
  tablet1024?: number;
  desktop1280?: number;
  desktop1600?: number;
}

export interface IGridCellProps extends IGridBaseProps, IDevices {}

export interface IGridProps extends IGridBaseProps {
  /** Отключение отступов внутри модульной сетки */
  noindent?: boolean | undefined;
  /** Отключение отступов снаружи модульной сетки */
  nomargin?: boolean | undefined;
  /** Определяет распределение пространства у элементов контента вдоль главной оси flex контейнера */
  justifyContent?: JustifyContent;
  /** Выравнивает элементы текущей flex-линии аналогично justifyContent, но в перпендикулярном направлении */
  alignItems?: AlignItems;
}

export interface IGridContext {
  noindent?: boolean | undefined;
}

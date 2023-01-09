import React, { FC } from 'react';

import { Page } from './Page';
import { PaginationComplexComponent } from './PaginationComplexComponent';
import { Range } from './Range';

const DEFAULT_RANGES = [20, 40, 60, 80];

export interface IPaginationComplexProps {
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Отключить выбор количества элементов на странице через выпадающее меню */
  disableItemsPerPageSelect?: boolean;
  /** Отключить выбор страницы через выпадающее меню */
  disablePageSelect?: boolean;
  /** Количество элементов на странице */
  itemsPerPage: number;
  /** Мобильный вид компонента */
  mobile?: boolean;
  /** Страница для отображения */
  page: number;
  /** Варианты выбора количества элементов на странице */
  ranges?: Array<number>;
  /** Число всех элементов */
  totalItems: number;
  /** Ширина компонента */
  width?: number | string;
  /** Коллбэк на изменение количества элементов на странице */
  onItemsPerPageChange?: (newItemsPerPage: number) => void;
  /** Коллбэк на изменение страницы */
  onPageChange: (newPage: number) => void;
}

export const PaginationComplex: FC<IPaginationComplexProps> = ({
  className,
  dataTestId,
  disableItemsPerPageSelect = false,
  disablePageSelect = false,
  itemsPerPage,
  mobile = false,
  page,
  ranges = DEFAULT_RANGES,
  totalItems,
  width,
  onItemsPerPageChange,
  onPageChange,
}) => {
  const lastPage = Math.ceil(totalItems / itemsPerPage);

  return (
    <PaginationComplexComponent className={className} data-test-id={dataTestId} mobile={mobile}>
      <Range
        disableItemsPerPageSelect={disableItemsPerPageSelect}
        itemsPerPage={itemsPerPage}
        lastPage={lastPage}
        mobile={mobile}
        page={page}
        ranges={ranges}
        totalItems={totalItems}
        onChange={onItemsPerPageChange}
      />
      <Page
        disablePageSelect={disablePageSelect}
        lastPage={lastPage}
        mobile={mobile}
        page={page}
        onChange={onPageChange}
      />
    </PaginationComplexComponent>
  );
};

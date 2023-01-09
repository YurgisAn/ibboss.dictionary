import React from 'react';
import type { FC, ReactNode } from 'react';

import { AccordionComponent } from './AccordionComponent';
import { Item } from './Item';

export interface IAccordionProps {
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Список элементов для отображения в аккордеоне */
  list: Array<IAccordionListItem>;
  /** Маленький размер аккордеона */
  small?: boolean;
  /** Коллбэк на изменение состояния элементов аккордеона */
  onChange: (id: number | string, expanded: boolean) => void;
}

export interface IAccordionListItem {
  /** Уникальные идентификатор элемента аккордеона */
  id: number | string;
  /** Заголовок элемента аккордеона */
  title: string;
  /** Контент элемента аккордеона */
  content: ReactNode;
  /** Cостояние элемента аккордеона (открыт/закрыт) */
  expanded?: boolean;
}

export const Accordion: FC<IAccordionProps> = ({
  className,
  dataTestId,
  list,
  small = false,
  onChange,
}) => (
  <AccordionComponent className={className} data-test-id={dataTestId}>
    {list.map((item) => (
      <Item key={item.id} small={small} onChange={onChange} {...item} />
    ))}
  </AccordionComponent>
);

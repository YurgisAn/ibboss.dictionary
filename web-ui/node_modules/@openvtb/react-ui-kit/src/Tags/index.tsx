import React, { Fragment, FC } from 'react';

import { useTooltip } from '../common/hooks';
import { createTooltipHOC } from '../TooltipHOC';
import { Caption1 } from '../Typography';

import { Button, Kind } from './Button';
import { Separator } from './Separator';
import { TagsWrapper } from './TagsWrapper';
import { StyledCaption11 } from './StyledCaption11';

export interface ITagsProps {
  /** Массив тегов */
  items: IItemTag[];
  /** Цвет тегов */
  kind: Kind;
  /** Обработчик возвращает id и label тега на который кликнули */
  onFilter?: (id: string, label: string) => void;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Ширина Тега */
  width?: number | string;
  /** Контейнер, в котором при необходимости можно отрисовать тултип через ReactDOM.createPortal */
  tooltipContainer?: Element | null;
}

export interface IItemTag {
  /** Уникальный идентификатор тега */
  id: string;
  /** Надпись тега */
  label: string;
}

export const Tags: FC<ITagsProps> = ({
  items,
  kind = 'grey',
  className,
  dataTestId,
  onFilter,
  width,
  tooltipContainer,
}) => {
  const [tooltipItems, itemsRef] = useTooltip();

  return (
    <TagsWrapper className={className} data-test-id={dataTestId}>
      {items.map((tagItem, index) => {
        const Tag = tooltipItems[index] ? createTooltipHOC(Button) : Button;
        const Text = tooltipItems[index] ? StyledCaption11 : Caption1;

        return (
          <Fragment key={tagItem.id}>
            <Tag
              key={tagItem.id}
              tooltip={tagItem.label}
              container={tooltipContainer}
              width={width}
              kind={kind}
              tabIndex={onFilter ? 1 : -1}
              onClick={onFilter ? () => onFilter(tagItem.id, tagItem.label) : undefined}
            >
              <Text ref={(el: HTMLDivElement) => itemsRef(el, index)}>{tagItem.label}</Text>
            </Tag>
            {index !== items.length - 1 && <Separator />}
          </Fragment>
        );
      })}
    </TagsWrapper>
  );
};

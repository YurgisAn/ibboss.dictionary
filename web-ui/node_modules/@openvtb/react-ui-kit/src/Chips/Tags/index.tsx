import React, { Fragment, FC } from 'react';

import { useTooltip } from '../../common/hooks';
import { createTooltipHOC } from '../../TooltipHOC';
import { ICON_SIZE_SMALL, ICON_SIZE_BIG } from '../common/constants';
import { ChipsWrapper } from '../common/ChipsWrapper';
import { Separator } from '../common/Separator';
import { StyledCaption11 } from '../common/Caption11';
import { Caption13 } from '../common/Caption13';

import { SubTractIcon } from './SubTractIcon';
import { ChipTagItem, Size } from './ChipTagItem';
import { CloseIconContainer } from './CloseIconContainer';
import { TagLabelContainer } from './TagLabelContainer';

export interface IChipsTagsProps {
  /** Массив чипсов */
  items: IItemChipTag[];
  /** Размер чипсов */
  size?: Size;
  /** Обработчик для удаления элемента из массива */
  onRemoveItem?: (id: string) => void;
  /** В селекте или нет, влияет на размер отступа */
  inSelect?: boolean;
  /** Отключение чипсов */
  disabled?: boolean;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Ширина Тега */
  width?: number | string;
  /** Контейнер, в котором при необходимости можно отрисовать тултип через ReactDOM.createPortal */
  tooltipContainer?: Element | null;
}
export interface IItemChipTag {
  /** Уникальный идентификатор чипса */
  id: string;
  /** Подпись к чипсу */
  label: string;
  /** Отключение чипса */
  disabled?: boolean;
}

export const Tags: FC<IChipsTagsProps> = ({
  items,
  inSelect,
  className,
  dataTestId,
  size = 'big',
  onRemoveItem,
  width,
  tooltipContainer,
}) => {
  const [tooltipItems, itemsRef] = useTooltip();
  return (
    <ChipsWrapper className={className} data-test-id={dataTestId}>
      {items.map((chipItem, index) => {
        const Chip = tooltipItems[chipItem.id] ? createTooltipHOC(ChipTagItem) : ChipTagItem;
        const Label = size === 'small' ? StyledCaption11 : Caption13;
        const iconSize = size === 'big' ? ICON_SIZE_BIG : ICON_SIZE_SMALL;

        return (
          <Fragment key={chipItem.id}>
            <Chip
              tooltip={chipItem.label}
              container={tooltipContainer}
              size={size}
              disabled={chipItem.disabled}
            >
              <TagLabelContainer size={size} width={width}>
                <Label ref={(el) => itemsRef(el, chipItem.id)}>{chipItem.label}</Label>
              </TagLabelContainer>
              <CloseIconContainer
                size={size}
                disabled={chipItem.disabled}
                tabIndex={chipItem.disabled ? -1 : 1}
                onClick={
                  !chipItem.disabled ? () => onRemoveItem && onRemoveItem(chipItem.id) : undefined
                }
              >
                <SubTractIcon width={iconSize} height={iconSize} />
              </CloseIconContainer>
            </Chip>
            {index !== items.length - 1 && <Separator inSelect={inSelect} />}
          </Fragment>
        );
      })}
    </ChipsWrapper>
  );
};

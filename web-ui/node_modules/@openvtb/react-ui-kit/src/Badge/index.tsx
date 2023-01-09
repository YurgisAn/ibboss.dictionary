import React, { FC } from 'react';

import { Body2Long, Caption1 } from '../Typography';

import { BadgeComponent } from './BadgeComponent';
import type { Kind, Size } from './BadgeComponent';

export interface IBadgeProps {
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Тип компонента */
  kind?: Kind;
  /** Размер компонента */
  size?: Size;
  /** Значение, отображаемое в бейдже */
  value: number;
}

export const Badge: FC<IBadgeProps> = ({
  className,
  dataTestId,
  kind = 'neutral-light',
  size = 'big',
  value,
}) => {
  const Label = size === 'big' ? Body2Long : Caption1;
  return (
    <BadgeComponent className={className} data-test-id={dataTestId} kind={kind} size={size}>
      <Label>{value}</Label>
    </BadgeComponent>
  );
};

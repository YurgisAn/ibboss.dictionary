import React from 'react';
import type { FC } from 'react';

import { Caption1 } from '../Typography';

import { Bar } from './Bar';
import { Info } from './Info';
import { Progress } from './Progress';
import { ProgressBarComponent } from './ProgressBarComponent';
import type { Kind } from './ProgressBarComponent';

export interface IProgressBarProps {
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Флаг ошибки */
  error?: boolean;
  /** Вид компонента */
  kind?: Kind;
  /** Надписть над полосой прогресса */
  label?: string;
  /** Значение прогресса от 1 до 100 */
  value: number;
}

export const ProgressBar: FC<IProgressBarProps> = ({
  className,
  dataTestId,
  error = false,
  kind = 'page',
  label,
  value,
}) => (
  <ProgressBarComponent className={className} data-test-id={dataTestId} kind={kind}>
    {kind === 'page' && (
      <Info error={error}>
        <Caption1>{label}</Caption1>
        <Caption1>{`${value}%`}</Caption1>
      </Info>
    )}
    <Bar>
      <Progress error={error} value={value} />
    </Bar>
  </ProgressBarComponent>
);

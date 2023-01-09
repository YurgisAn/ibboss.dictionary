import React from 'react';
import type { FC, ReactElement } from 'react';

import { Checkbox } from '../Checkbox';

import { ChildrenLayout } from './ChildrenLayout';
import { CustomLabel } from './CustomLabel';
import { Toggle } from './Toggle';
import { TreeBranchComponent } from './TreeBranchComponent';
import type { Size } from './TreeBranchComponent';

export interface ITreeBranchProps {
  /** Состояние чекбокса: выбран/не выбран */
  checked?: boolean;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Показывать/скрывать дочернии ветки */
  expanded?: boolean;
  /** Отображение ветки как заголовка (жирный текст) */
  header?: boolean;
  /** Скрыть чекбокс и отображать только текст (и иконку) */
  hideCheckbox?: boolean;
  /** Иконка, которая будет отображаться слева от текста */
  icon?: ReactElement;
  /** Уникальный идентификатор ветки */
  id: string | number;
  /** Неопределённое состояние чекбокса */
  indeterminate?: boolean;
  /** Текст, который будет отображаться в ветке */
  label: string;
  /** Размер ветки */
  size?: Size;
  /** Коллбэк на изменение состояния чекбокса. Срабатывает при клике или нажатии Enter/Space при переходе по табу */
  onCheck?: (id: string | number, checked: boolean) => void;
  /** Коллбэк на изменение состояния переключателя, отвечающего за показ/скрытие дочерних веток. Срабатывает при клике или нажатии Enter/Space при переходе по табу */
  onExpand?: (id: string | number, expanded: boolean) => void;
}

export const TreeBranch: FC<ITreeBranchProps> = ({
  checked,
  children,
  className,
  dataTestId,
  expanded,
  header,
  hideCheckbox,
  icon,
  id,
  indeterminate,
  label,
  size = 'big',
  onCheck,
  onExpand,
}) => {
  const renderLabel = () => {
    if (!hideCheckbox && !header && !icon) return label;
    return (
      <CustomLabel header={header} icon={icon} size={size}>
        {label}
      </CustomLabel>
    );
  };

  return (
    <>
      <TreeBranchComponent className={className} data-test-id={dataTestId} size={size}>
        {children && (
          <Toggle expanded={expanded} size={size} onChange={() => onExpand?.(id, !expanded)} />
        )}
        {hideCheckbox ? (
          renderLabel()
        ) : (
          <Checkbox
            checked={checked}
            indeterminate={indeterminate}
            label={renderLabel()}
            size={size}
            onChange={(_, checked) => onCheck?.(id, checked)}
          />
        )}
      </TreeBranchComponent>
      {expanded && children && <ChildrenLayout size={size}>{children}</ChildrenLayout>}
    </>
  );
};

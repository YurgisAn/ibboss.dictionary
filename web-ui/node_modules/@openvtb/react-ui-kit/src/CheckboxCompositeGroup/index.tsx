import React, { FC, MouseEvent, KeyboardEvent } from 'react';

import { Checkbox, ICheckboxProps } from '../Checkbox';
import { ICheckboxGroupItem } from '../CheckboxGroup';

import { CheckboxCompositeItemsWrapper } from './CheckboxCompositeItemsWrapper';
import { CheckboxCompositeItem } from './CheckboxCompositeItem';
import { GroupWrapper } from './GroupWrapper';

type CheckboxSize = ICheckboxProps['size'];

export interface ICheckboxCompositeGroupProps {
  /** Список чекбоксов, которые войдут в композитную группу */
  list: ICheckboxGroupItem[];
  /** Коллбэк на изменение состояния. Срабатывает при клике или нажатии Enter/Space при переходе по табу */
  onChange: (
    evt: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    list: ICheckboxGroupItem[]
  ) => void;
  /** Название композитной группы чекбоксов */
  label?: string;
  /** Отключение композитной группы чекбосксов */
  disabled?: boolean;
  /** Размер композитной группы чекбоксов */
  size?: CheckboxSize;
  /** Состояние композитной группы чекбоксов: true - если выбраны все чекбоксы */
  checked?: boolean;
  /** Состояние ошибки композитной группы чекбоксов */
  error?: boolean;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
}

export const CheckboxCompositeGroup: FC<ICheckboxCompositeGroupProps> = ({
  list,
  onChange,
  label,
  disabled,
  size = 'big',
  checked = false,
  error,
  className,
  dataTestId,
}: ICheckboxCompositeGroupProps) => {
  const handleItemChange = (
    evt: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    item: ICheckboxGroupItem
  ) => {
    const { disabled, checked } = item;
    if (!disabled) {
      const newItem = { ...item, checked: !checked };
      const newList = list.map((listItem: ICheckboxGroupItem) =>
        listItem.id === item.id ? newItem : listItem
      );

      onChange && onChange(evt, newList);
    }
  };

  const handleChange = (
    evt: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    checked: boolean
  ) => {
    if (!disabled) {
      const newList = list.map((listItem: ICheckboxGroupItem) => ({
        ...listItem,
        checked: !(getCheckedStatus(list) || getIndeterminateStatus(list)),
      }));

      onChange && onChange(evt, newList);
    }
  };

  const getCheckedStatus = (list: ICheckboxGroupItem[]) =>
    list.every((item: ICheckboxGroupItem) => !!item.checked);
  const getIndeterminateStatus = (list: ICheckboxGroupItem[]) =>
    !list.every((item: any) => item.checked) &&
    list.some((item: ICheckboxGroupItem) => !!item.checked);

  return (
    <GroupWrapper className={className} data-test-id={dataTestId}>
      <Checkbox
        size={size}
        onChange={(
          evt: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
          checked: boolean
        ) => handleChange(evt, checked)}
        disabled={disabled}
        checked={checked || getCheckedStatus(list)}
        error={error}
        label={label && label}
        indeterminate={getIndeterminateStatus(list)}
      />
      <CheckboxCompositeItemsWrapper size={size}>
        {list.map((item: ICheckboxGroupItem, i: number) => (
          <CheckboxCompositeItem key={i} size={size}>
            <Checkbox
              size={size}
              onChange={(evt: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) =>
                handleItemChange(evt, item)
              }
              disabled={disabled || item.disabled}
              checked={!!item.checked}
              label={item.label}
              error={error || item.error}
            />
          </CheckboxCompositeItem>
        ))}
      </CheckboxCompositeItemsWrapper>
    </GroupWrapper>
  );
};

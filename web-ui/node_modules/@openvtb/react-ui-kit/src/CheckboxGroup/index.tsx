import React, { FC, MouseEvent, KeyboardEvent } from 'react';

import { Checkbox, ICheckboxProps } from '../Checkbox';

import { CheckboxGroupItem } from './CheckboxGroupItem';
import { CheckboxGroupWrapper } from './CheckboxGroupWrapper';
import { Label } from './Label';

export interface ICheckboxGroupItem {
  /** Уникальный идентификатор чекбокса */
  id: string | number;
  /** Подпись к чекбоксу */
  label: string;
  /** Состояние чекбокса: выбран/не выбран */
  checked?: boolean;
  /** Отключение чекбокса */
  disabled?: boolean;
  /** Состояние ошибки чекбокса */
  error?: boolean;
}

export interface ICheckboxGroupProps {
  /** Список чекбоксов, которые войдут в группу */
  list: ICheckboxGroupItem[];
  /** Коллбэк на изменение состояния. Срабатывает при клике или нажатии Enter/Space при переходе по табу */
  onChange: (
    evt: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    list: ICheckboxGroupItem[]
  ) => void;
  /** Название группы чекбоксов */
  label?: string;
  /** Отключение группы чекбосксов */
  disabled?: boolean;
  /** Размер группы чекбоксов */
  size?: ICheckboxProps['size'];
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
}

export const CheckboxGroup: FC<ICheckboxGroupProps> = ({
  list,
  onChange,
  label,
  disabled,
  size = 'big',
  className,
  dataTestId,
}: ICheckboxGroupProps) => {
  const handleChange = (
    evt: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    item: ICheckboxGroupItem
  ) => {
    if (!disabled) {
      const newItem = { ...item, checked: !item.checked };
      const newList = list.map((listItem: ICheckboxGroupItem) =>
        listItem.id === item.id ? newItem : listItem
      );

      onChange && onChange(evt, newList);
    }
  };

  const CheckboxGroupLabel = Label(size);

  return (
    <CheckboxGroupWrapper disabled={disabled} className={className} data-test-id={dataTestId}>
      {label && (
        <CheckboxGroupLabel disabled={disabled} size={size}>
          {label}
        </CheckboxGroupLabel>
      )}
      {list.map((item: ICheckboxGroupItem, i: number) => (
        <CheckboxGroupItem size={size} key={i}>
          <Checkbox
            size={size}
            onChange={(evt: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) =>
              handleChange(evt, item)
            }
            disabled={disabled || item.disabled}
            checked={!!item.checked}
            label={item.label}
            error={item.error}
          />
        </CheckboxGroupItem>
      ))}
    </CheckboxGroupWrapper>
  );
};

import React from 'react';

import { RadioButton } from '../RadioButton';

import { RadioGroupSize } from './constants';
import { RadioGroupWrapper } from './RadioGroupWrapper';
import { Label } from './Label';

export interface IRadioGroupProps {
  /** Значение группы радиокнопок */
  value: any;
  /** Коллбэк на изменение состояния. Срабатывает при клике или нажатии Enter/Space при переходе по табу */
  onChange: (value: { value: any; id?: string }) => void;
  /** Список радиокнопок */
  list: IRadioGroupListItem[];
  /** Заголовок группы радиокнопок */
  label?: string;
  /** Отключение группы радиокнопок */
  disabled?: boolean;
  /** id группы радиокнопок */
  id?: string;
  /** Размер группы радиокнопок */
  size?: RadioGroupSize;
  /** Атрибут name группы радиокнопок, в рамках одной группы все радиокнопки имеют одинаковый name */
  name?: string;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
}

export interface IRadioGroupListItem {
  /** Подпись к радиокнопке */
  label: string;
  /** Значение радиокнопки */
  value: any;
  /** Размер радиокнопки */
  size?: RadioGroupSize;
  /** Отключение радиокнопки */
  disabled?: boolean;
  /** Состояние ошибки радиокнопки */
  error?: boolean;
}

export const RadioGroup: React.FC<IRadioGroupProps> = ({
  id,
  label,
  value,
  size = 'big',
  name,
  list,
  disabled,
  onChange,
  className,
  dataTestId,
}) => {
  const handleChange = (value: any) => {
    onChange && onChange({ value, id });
  };
  const LabelWrapper = Label(size);

  return (
    <RadioGroupWrapper size={size} className={className} data-test-id={dataTestId}>
      {label && (
        <LabelWrapper size={size} disabled={disabled}>
          {label}
        </LabelWrapper>
      )}
      {list.map((item, i) => {
        return (
          <RadioButton
            key={i}
            size={item.size || size}
            checked={item.value === value}
            disabled={item.disabled || disabled}
            error={!(item.value === value) && item.error}
            label={item.label}
            value={item.value}
            name={name}
            onChange={(_, value) => handleChange(value)}
          />
        );
      })}
    </RadioGroupWrapper>
  );
};

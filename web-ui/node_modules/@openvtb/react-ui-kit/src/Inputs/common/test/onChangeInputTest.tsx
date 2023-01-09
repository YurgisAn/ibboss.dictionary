import React from 'react';
import { shallow } from 'enzyme';

import { InputSkeleton } from '../../BaseField/InputSkeleton';
import { InputComponent } from '../../BaseField/StyledComponents/InputComponent';

/**
 * Дефолтные тесты onChange
 * @param {component} TypeInput - Компонент Input (Input.Number)
 * @param {string} targetValue - Значение из Event.target
 * @param {string} resultValue - Значение в Input
 * @param {string} label - Тектс лейбла
 * @param {component} findNode - Поиск компонента или атрибута
 * @param {string} masked - Маска
 * @param {string} value - Начальное значение инпута
 * @return {}  - Тест на onChange
 */

export const runCommonInputOnChangeTest = (
  TypeInput: any,
  targetValue: string,
  resultValue: string,
  label = 'Введите ваше имя',
  findNode = InputComponent,
  masked = '',
  value = ''
) => {
  const inputName = 'test';

  const changeUsernameSpy = jest.fn();
  return [
    it('should call onChange when user presses keys in input field', () => {
      const wrapper = shallow(
        <TypeInput
          masked={masked}
          value={value}
          onChange={changeUsernameSpy}
          label={label}
          size={'small'}
          inputName={inputName}
        />
      );
      const input = wrapper.dive().find(InputSkeleton).dive().find(findNode);

      input.simulate('change', { target: { value: `${targetValue}` } });

      expect(changeUsernameSpy).toBeCalledWith(
        { target: { value: `${targetValue}` } },
        `${resultValue}`
      );
    }),
  ];
};

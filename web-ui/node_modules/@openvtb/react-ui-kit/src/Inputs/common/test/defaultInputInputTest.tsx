import React, { ChangeEvent } from 'react';
import { shallow } from 'enzyme';

import { ReactComponent as CameraSolid } from '../../../Icons/system/CameraSolid.svg';
/**
 * Дефолтные тесты рендера Input
 * @param {component} TypeInput - Компонент Input (Input.Number)
 * @param {string} label - Текст лейбла
 * @param {string} value - Значение инпута
 * @return {[]}  - Массив с тестами
 */

export const runCommonInputTest = (TypeInput: any, label = 'Введите ваше имя', value = '') => {
  const textError = `Ошибка`;
  const textSuccess = `Успех`;
  const inputName = 'test';

  return [
    it('should render component', () => {
      const wrapper = shallow(
        <TypeInput
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>, value: string) => value}
        />
      );
      expect(wrapper).toMatchSnapshot();
    }),

    it('should render component with error status', () => {
      const wrapper = shallow(
        <TypeInput
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>, value: string) => value}
          label={value}
          additionalText={textError}
          status={'error'}
          size={'big'}
        />
      );
      expect(wrapper).toMatchSnapshot();
    }),

    it('should render component with success status', () => {
      const wrapper = shallow(
        <TypeInput
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>, value: string) => value}
          label={label}
          additionalText={textSuccess}
          status={'success'}
          size={'big'}
        />
      );
      expect(wrapper).toMatchSnapshot();
    }),

    it('should render component with clearable field, icon and name', () => {
      const wrapper = shallow(
        <TypeInput
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>, value: string) => value}
          label={label}
          clearable
          size={'micro'}
          icon={<CameraSolid />}
          inputName={inputName}
        />
      );
      expect(wrapper).toMatchSnapshot();
    }),
  ];
};

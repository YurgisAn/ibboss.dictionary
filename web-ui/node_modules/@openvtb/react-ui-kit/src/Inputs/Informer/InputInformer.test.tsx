import React, { ChangeEvent } from 'react';
import { shallow } from 'enzyme';

import { Input } from '../../Inputs';
import { runCommonInputTest, runCommonInputOnChangeTest } from '../common/test';

jest.mock('../../common', () => ({
  DEFAULT_THEME: {},
  Z_INDEXES: {
    INFORMER: 777,
  },
}));

const textError = `Ошибка`;
const label = 'Информер';
const message = 'Привет информер';

describe('Input.Informer', () => {
  runCommonInputTest(Input.Informer);
  runCommonInputOnChangeTest(Input.Informer, '1000', '1000');

  it('should render component with message props', () => {
    const wrapper = shallow(
      <Input.Informer
        value={''}
        onChange={(event: ChangeEvent<HTMLInputElement>, value: string) => value}
        label={label}
        additionalText={textError}
        status={'error'}
        size={'big'}
        message={message}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

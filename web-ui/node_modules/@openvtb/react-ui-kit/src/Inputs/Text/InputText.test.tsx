import React from 'react';
import { shallow } from 'enzyme';

import { ReactComponent as CameraSolid } from '../../Icons/system/CameraSolid.svg';
import { runCommonInputTest, runCommonInputOnChangeTest } from '../common/test';
import { Input } from '../../Inputs';
import { InputSkeleton } from '../BaseField/InputSkeleton';

import { StyledСloseOutline } from './StyledСloseOutline';

jest.mock('../../common', () => ({
  DEFAULT_THEME: {},
  Z_INDEXES: {
    INFORMER: 777,
  },
}));

describe('Input.Text', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  runCommonInputTest(Input.Text);
  runCommonInputOnChangeTest(Input.Text, 'Changed', 'Changed');

  it('should clear input field when user clicks on clear icon', () => {
    const changeUsernameSpy = jest.fn();
    const label = `Введите ваше имя`;

    const wrapper = shallow(
      <Input.Text
        size={'big'}
        value="Test"
        width={300}
        label={label}
        onChange={changeUsernameSpy}
        icon={<CameraSolid />}
        inputName="input-phone"
        clearable
      />
    );

    const clear = wrapper.dive().find(InputSkeleton).dive().find(StyledСloseOutline);
    clear.props().onClick(changeUsernameSpy);
    expect(changeUsernameSpy).toBeCalledTimes(1);
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import { runCommonInputTest, runCommonInputOnChangeTest } from '../common/test';
import { Input } from '../../Inputs';
import { InputSkeleton } from '../BaseField/InputSkeleton';

import { StyledMinusOutline } from './StyledMinusOutline';
import { StyledPlusOutline } from './StyledPlusOutline';

jest.mock('../../common', () => ({
  DEFAULT_THEME: {},
  Z_INDEXES: {
    INFORMER: 777,
  },
}));

describe('Input.Number', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const spyOn = jest.fn();

  const step = 1000;

  runCommonInputTest(Input.Number);
  runCommonInputOnChangeTest(Input.Number, '1000', '1000');
  runCommonInputOnChangeTest(Input.Number, 'qwerty', '');
  runCommonInputOnChangeTest(Input.Number, '1 000', '1000');

  it('should call onChange increment value when user clicks on plus icon', () => {
    const wrapper = shallow(<Input.Number size={'big'} value="0" step={step} onChange={spyOn} />);

    const icon = wrapper.dive().find(InputSkeleton).dive().find(StyledPlusOutline);
    icon.simulate('click');
    expect(spyOn).toBeCalledTimes(1);
    expect(spyOn).toBeCalledWith(undefined, '1000');
  });

  it('should call onChange decrement value when user clicks on minus icon', () => {
    const wrapper = shallow(
      <Input.Number size={'big'} value="3000" step={step} onChange={spyOn} />
    );

    const icon = wrapper.dive().find(InputSkeleton).dive().find(StyledMinusOutline);
    icon.simulate('click');
    expect(spyOn).toBeCalledTimes(1);
    expect(spyOn).toBeCalledWith(undefined, '2000');
  });

  it('should call onChange decrement value when user clicks on minus icon and value === 0', () => {
    const wrapper = shallow(<Input.Number size={'big'} onChange={spyOn} value="0" step={step} />);

    const icon = wrapper.dive().find(InputSkeleton).dive().find(StyledMinusOutline);
    icon.simulate('click');
    expect(spyOn).toBeCalledTimes(1);
    expect(spyOn).toBeCalledWith(undefined, '0');
  });
});

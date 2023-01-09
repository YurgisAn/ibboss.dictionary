import React from 'react';
import { shallow } from 'enzyme';

import { TimePicker } from '../TimePicker';

jest.mock('../common', () => ({
  DEFAULT_THEME: {},
}));

const textError = `Ошибка`;
const label = 'Выберите время';
const changeUsernameSpy = jest.fn();

describe('TimePicker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render component with props', () => {
    const wrapper = shallow(
      <TimePicker
        value={{ hours: '', minutes: '' }}
        onChange={(value: any) => value}
        label={label}
        additionalText={textError}
        size={'big'}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onChange when user presses keys in timepicker field', () => {
    const wrapper = shallow(
      <TimePicker
        value={{ hours: '', minutes: '' }}
        onChange={changeUsernameSpy}
        label={label}
        size={'small'}
      />
    );
    const input = wrapper.childAt(0);
    input.simulate('change', { value: '1100', masked: '' });

    expect(changeUsernameSpy).toBeCalledTimes(1);
    expect(changeUsernameSpy).toBeCalledWith({ hours: '11', minutes: '00' });
  });

  it('should call onChange when user presses keys in input timepicker', () => {
    const wrapper = shallow(
      <TimePicker
        value={{ hours: '', minutes: '' }}
        onChange={changeUsernameSpy}
        label={label}
        size={'small'}
      />
    );
    const input = wrapper.childAt(0);

    input.simulate('change', { value: '009992313', masked: '' });

    expect(changeUsernameSpy).toBeCalledTimes(1);
    expect(changeUsernameSpy).toBeCalledWith({ hours: '00', minutes: '99' });
  });
});

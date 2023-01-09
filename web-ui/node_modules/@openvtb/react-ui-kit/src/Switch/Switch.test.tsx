import React from 'react';
import { shallow } from 'enzyme';

import { Switch } from '../Switch';
import type { ISwitchProps } from '../Switch';

jest.mock('../common', () => ({
  DEFAULT_THEME: {},
}));

describe('Switch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const switchProps: ISwitchProps = {
    label: 'Switch',
    labelPosition: 'right',
    size: 'small',
    onChange: jest.fn(),
  };

  it('should render component with required properties', () => {
    const wrapper = shallow(<Switch onChange={switchProps.onChange} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with label and small size', () => {
    const wrapper = shallow(<Switch {...switchProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onClick when user clicks on component', () => {
    const wrapper = shallow(<Switch {...switchProps} />);
    wrapper.simulate('click');
    const { onChange } = switchProps;
    expect(onChange).toBeCalledTimes(1);
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import { RadioGroup } from './';

jest.mock('../common', () => ({
  DEFAULT_THEME: {},
}));

describe('RadioGroup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const radioGroupProps = {
    onChange: jest.fn(),
    value: 'Moscow',
    list: [
      { label: 'Москва', value: 'Moscow' },
      { label: 'Самара', value: 'Samara' },
      { label: 'Воронеж', value: 'Voronez' },
    ],
  };

  it('should render component with required properties', () => {
    const wrapper = shallow(<RadioGroup {...radioGroupProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with label', () => {
    const wrapper = shallow(<RadioGroup {...radioGroupProps} label="RadioGroup" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with small size', () => {
    const wrapper = shallow(<RadioGroup {...radioGroupProps} size={'small'} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with disabled state', () => {
    const wrapper = shallow(<RadioGroup {...radioGroupProps} disabled />);
    expect(wrapper).toMatchSnapshot();
  });
});

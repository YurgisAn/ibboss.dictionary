import React from 'react';
import { shallow } from 'enzyme';

import { CheckboxGroup } from './';

jest.mock('../common', () => ({
  DEFAULT_THEME: {},
}));

describe('CheckboxGroup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const checkboxGroupProps = {
    list: [
      { id: 1, label: 'First item' },
      { id: 2, label: 'Second item' },
      { id: 3, label: 'Third item' },
    ],
    onChange: jest.fn(),
  };

  it('should render component with required properties', () => {
    const wrapper = shallow(<CheckboxGroup {...checkboxGroupProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with label', () => {
    const wrapper = shallow(<CheckboxGroup {...checkboxGroupProps} label="CheckboxGroup" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with small size', () => {
    const wrapper = shallow(<CheckboxGroup {...checkboxGroupProps} size="small" />);
    expect(wrapper).toMatchSnapshot();
  });
});

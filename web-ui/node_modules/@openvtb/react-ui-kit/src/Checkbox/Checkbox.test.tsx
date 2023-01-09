import React from 'react';
import { shallow } from 'enzyme';

import { Checkbox } from './';

jest.mock('../common', () => ({
  DEFAULT_THEME: {},
}));

describe('Checkbox', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const checkboxRequiredProps = {
    onChange: jest.fn(),
  };

  it('should render component with required properties', () => {
    const wrapper = shallow(<Checkbox {...checkboxRequiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with label', () => {
    const wrapper = shallow(<Checkbox {...checkboxRequiredProps} label="Checkbox" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with small size', () => {
    const wrapper = shallow(<Checkbox {...checkboxRequiredProps} size={'small'} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with indeterminate state', () => {
    const wrapper = shallow(<Checkbox {...checkboxRequiredProps} indeterminate />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onClick when use clicks on component', () => {
    const wrapper = shallow(<Checkbox {...checkboxRequiredProps} />);
    wrapper.simulate('click');
    const { onChange } = checkboxRequiredProps;
    expect(onChange).toBeCalledTimes(1);
  });
});

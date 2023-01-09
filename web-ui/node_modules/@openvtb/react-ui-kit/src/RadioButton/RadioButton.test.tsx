import React from 'react';
import { shallow } from 'enzyme';

import { RadioButton } from '../RadioButton';

jest.mock('../common', () => ({
  DEFAULT_THEME: {},
}));

describe('RadioButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const radiobuttonRequiredProps = {
    onChange: jest.fn(),
    label: 'RadioButton',
    value: 'radio1',
    checked: false,
  };

  it('should render component with required properties', () => {
    const wrapper = shallow(<RadioButton {...radiobuttonRequiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with disabled state', () => {
    const wrapper = shallow(<RadioButton {...radiobuttonRequiredProps} disabled />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with small size', () => {
    const wrapper = shallow(<RadioButton {...radiobuttonRequiredProps} size="small" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with error state', () => {
    const wrapper = shallow(<RadioButton {...radiobuttonRequiredProps} error />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onChange when user clicks on component', () => {
    const wrapper = shallow(<RadioButton {...radiobuttonRequiredProps} />);
    wrapper.simulate('click');
    const { onChange } = radiobuttonRequiredProps;
    expect(onChange).toBeCalledTimes(1);
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import { Badge } from '../Badge';

jest.mock('../common', () => ({
  DEFAULT_THEME: {},
}));

describe('Badge', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const requiredProps = {
    value: 5,
  };

  it('should render component with required properties, kind NEUTRAL_LIGHT and big size by default', () => {
    const wrapper = shallow(<Badge {...requiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with small size', () => {
    const wrapper = shallow(<Badge {...requiredProps} size="small" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with kind INFO', () => {
    const wrapper = shallow(<Badge {...requiredProps} kind="info" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with kind NEUTRAL_GREY', () => {
    const wrapper = shallow(<Badge {...requiredProps} kind="neutral-grey" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with kind NEUTRAL_DARK', () => {
    const wrapper = shallow(<Badge {...requiredProps} kind="neutral-dark" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with kind SUCCESS', () => {
    const wrapper = shallow(<Badge {...requiredProps} kind="success" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with kind ERROR', () => {
    const wrapper = shallow(<Badge {...requiredProps} kind="error" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with kind NEUTRAL_LIGHT_DISABLED', () => {
    const wrapper = shallow(<Badge {...requiredProps} kind="neutral-light-disabled" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with kind NEUTRAL_LIGHT_INACTIVE', () => {
    const wrapper = shallow(<Badge {...requiredProps} kind="neutral-light-inactive" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with kind NEUTRAL_WHITE', () => {
    const wrapper = shallow(<Badge {...requiredProps} kind="neutral-white" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with kind NEUTRAL_WHITE_DISABLED', () => {
    const wrapper = shallow(<Badge {...requiredProps} kind="neutral-white-disabled" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with kind NEUTRAL_WHITE_INACTIVE', () => {
    const wrapper = shallow(<Badge {...requiredProps} kind="neutral-white-inactive" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with kind WARNING', () => {
    const wrapper = shallow(<Badge {...requiredProps} kind="warning" />);
    expect(wrapper).toMatchSnapshot();
  });
});

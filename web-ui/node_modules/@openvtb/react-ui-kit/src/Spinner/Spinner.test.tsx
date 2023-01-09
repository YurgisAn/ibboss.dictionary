import React from 'react';
import { shallow } from 'enzyme';

import { Spinner } from './';

describe('Spinner', () => {
  it('should render component with big size by default', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with medium size', () => {
    const wrapper = shallow(<Spinner size="medium" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with small size', () => {
    const wrapper = shallow(<Spinner size="small" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with inverse color', () => {
    const wrapper = shallow(<Spinner inverse />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import { ProgressBar } from '../ProgressBar';

jest.mock('../common', () => ({
  DEFAULT_THEME: {},
}));

describe('ProgressBar', () => {
  it('should render component with kind "page" by default', () => {
    const wrapper = shallow(<ProgressBar value={0} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with kind "top"', () => {
    const wrapper = shallow(<ProgressBar kind="top" value={0} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with label when kind equals "page"', () => {
    const wrapper = shallow(<ProgressBar kind="page" label="Загрузка данных ..." value={0} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with percentage progress when kind equals "page"', () => {
    const wrapper = shallow(<ProgressBar kind="page" value={50} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with error when kind equals "page"', () => {
    const wrapper = shallow(<ProgressBar error kind="page" value={0} />);
    expect(wrapper).toMatchSnapshot();
  });
});

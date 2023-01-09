import React from 'react';
import { shallow } from 'enzyme';

import { MultiSelect } from '../MultiSelect';

jest.mock('../common', () => ({
  DEFAULT_THEME: {},
}));

describe('MultiSelect', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const MultiSelectListProps = {
    list: [
      {
        label: 'Москва',
        value: 1,
      },
      {
        label: 'Новгород',
        value: 2,
      },
      {
        label: 'Орел',
        value: 3,
      },
      <div data-value="Berlin" data-label="Берлин">
        Берлин
      </div>,
    ],
    value: [],
    onChange: jest.fn(),
  };

  const MultiSelectInitialProps = {
    list: [
      {
        label: 'Москва',
        value: 'Moscow',
      },
      {
        label: 'Париж',
        value: 'Paris',
      },
      {
        label: 'Прага',
        value: 'Prague',
      },
      <div data-value="Berlin" data-label="Берлин">
        Берлин
      </div>,
      {
        label: 'Амстердам',
        value: 'Amsterdam',
      },
    ],
    value: [
      {
        label: 'Москва',
        value: 'Moscow',
      },
      <div data-value="Berlin" data-label="Берлин">
        Берлин
      </div>,
    ],
    onChange: jest.fn(),
  };

  it('should render component with big size', () => {
    const wrapper = shallow(<MultiSelect {...MultiSelectListProps} size="big" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with small size', () => {
    const wrapper = shallow(<MultiSelect {...MultiSelectListProps} size="small" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with micro size', () => {
    const wrapper = shallow(<MultiSelect {...MultiSelectListProps} size="micro" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with disabled state', () => {
    const wrapper = shallow(<MultiSelect {...MultiSelectListProps} size="big" disabled />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with error state', () => {
    const wrapper = shallow(<MultiSelect {...MultiSelectListProps} size="big" error />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with initialValue state', () => {
    const wrapper = shallow(<MultiSelect {...MultiSelectInitialProps} size="big" />);
    expect(wrapper).toMatchSnapshot();
  });
});

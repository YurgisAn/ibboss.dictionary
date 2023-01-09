import React from 'react';
import { shallow } from 'enzyme';

import { CheckboxCompositeGroup } from './';

jest.mock('../common', () => ({
  DEFAULT_THEME: {},
}));

describe('CheckboxCompositeGroup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const checkboxCompositeGroupProps = {
    list: [
      { id: 1, label: 'First item' },
      { id: 2, label: 'Second item' },
      { id: 3, label: 'Third item' },
    ],
    onChange: jest.fn(),
  };

  it('should render component with required properties', () => {
    const wrapper = shallow(<CheckboxCompositeGroup {...checkboxCompositeGroupProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with label', () => {
    const wrapper = shallow(
      <CheckboxCompositeGroup {...checkboxCompositeGroupProps} label="CheckboxCompositeGroup" />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with small size', () => {
    const wrapper = shallow(
      <CheckboxCompositeGroup {...checkboxCompositeGroupProps} size={'small'} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

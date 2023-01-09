import React from 'react';
import { shallow } from 'enzyme';

import { Tags, IItemTag } from './';

const listItems: IItemTag[] = [
  { id: '1', label: 'Культура' },
  { id: '2', label: 'Кино' },
  { id: '3', label: 'Новости' },
  { id: '4', label: 'Музыка' },
];

const tagsRequiredProps = {
  onFilter: jest.fn(),
  items: listItems,
};

jest.mock('../common', () => ({
  DEFAULT_THEME: {},
  Z_INDEXES: {
    TOOLTIP: 777,
  },
}));

describe('Tags', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render component with items', () => {
    const wrapper = shallow(<Tags kind="red" {...tagsRequiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onClick when use click on component', () => {
    const wrapper = shallow(<Tags kind="blue" {...tagsRequiredProps} />);
    wrapper.childAt(0).simulate('click');
    const { onFilter } = tagsRequiredProps;
    expect(onFilter).toBeCalledTimes(1);
  });
});

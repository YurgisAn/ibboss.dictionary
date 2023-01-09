import React from 'react';
import { shallow } from 'enzyme';

import { CloseIconContainer } from './CloseIconContainer';

import { IItemChipTag, Tags } from './index';

const listData: IItemChipTag[] = [
  { id: '1', label: 'Суздаль' },
  { id: '2', label: 'Москва', disabled: true },
];

const listItemsDisabled: IItemChipTag[] = [
  { id: 'a', label: 'Суздаль', disabled: true },
  { id: 'b', label: 'Москва', disabled: true },
  { id: 'c', label: 'Тверь', disabled: true },
  { id: 'd', label: 'Самара', disabled: true },
];

jest.mock('../../common', () => ({
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
    const wrapper = shallow(
      <Tags
        items={listData}
        size={'big'}
        onRemoveItem={(id) => listData.filter((d) => d.id !== id)}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with disabled items', () => {
    const wrapper = shallow(<Tags items={listItemsDisabled} size={'big'} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onClick when use click on component', () => {
    const chipsRequiredProps = {
      onRemoveItem: jest.fn(),
    };
    const wrapper = shallow(<Tags items={listData} size={'big'} {...chipsRequiredProps} />);
    wrapper.childAt(0).find(CloseIconContainer).simulate('click');
    const { onRemoveItem } = chipsRequiredProps;
    expect(onRemoveItem).toBeCalledTimes(1);
  });

  it('should call onClick when use click on disabled component', () => {
    const chipsRequiredProps = {
      onRemoveItem: jest.fn(),
    };
    const wrapper = shallow(
      <Tags items={listItemsDisabled} size={'big'} {...chipsRequiredProps} />
    );
    wrapper.childAt(0).find(CloseIconContainer).simulate('click');
    const { onRemoveItem } = chipsRequiredProps;
    expect(onRemoveItem).toBeCalledTimes(0);
  });
});

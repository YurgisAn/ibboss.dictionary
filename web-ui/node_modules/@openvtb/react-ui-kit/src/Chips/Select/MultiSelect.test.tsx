import React from 'react';
import { shallow } from 'enzyme';

import { IItemChipSelect } from './types';
import { MultiSelect } from './MultiSelect';

const listData: IItemChipSelect[] = [
  { id: '1', label: 'Суздаль' },
  { id: '2', label: 'Москва', disabled: true },
];

const listItemsDisabled: IItemChipSelect[] = [
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

describe('Chips.MultiSelect', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render component with items', () => {
    const wrapper = shallow(<MultiSelect items={listData} size={'big'} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with disabled items', () => {
    const wrapper = shallow(<MultiSelect items={listItemsDisabled} size={'big'} />);
    expect(wrapper).toMatchSnapshot();
  });
});

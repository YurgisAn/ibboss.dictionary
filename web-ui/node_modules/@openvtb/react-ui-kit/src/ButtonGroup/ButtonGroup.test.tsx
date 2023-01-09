import React from 'react';
import { shallow } from 'enzyme';

import { KEY_CODES } from '../common';
import { ButtonGroup } from '../ButtonGroup';

jest.mock('../common', () => ({
  DEFAULT_THEME: {
    borderRadius: '',
    color: {
      neutral: {
        50: '',
        30: '',
      },
    },
  },
  KEY_CODES: {
    ENTER: 13,
    SPACEBAR: 32,
  },
  Z_INDEXES: {
    TOOLTIP: 777,
  },
}));

describe('ButtonGroup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const requiredProps = {
    activeButtonId: 0,
    list: [
      {
        id: 0,
        label: 'Foo',
      },
    ],
    onChange: jest.fn(),
  };

  it('should render component with required properties', () => {
    const wrapper = shallow(<ButtonGroup {...requiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render all items from list', () => {
    const item = requiredProps.list[0];
    const listItems = new Array(4).fill(item, 0, 4);

    const wrapper = shallow(<ButtonGroup {...requiredProps} list={listItems} />);
    expect(wrapper.children()).toHaveLength(listItems.length);
  });

  it('should call onChange if user clicks on button', () => {
    const wrapper = shallow(<ButtonGroup {...requiredProps} />);
    const item = wrapper.childAt(0);
    item.simulate('click');
    expect(requiredProps.onChange).toBeCalledTimes(1);
  });

  it("shouldn't call onChange if user clicks on disabled button", () => {
    const props = {
      ...requiredProps,
      list: [
        {
          ...requiredProps.list[0],
          disabled: true,
        },
      ],
    };
    const wrapper = shallow(<ButtonGroup {...props} />);
    const item = wrapper.childAt(0);
    item.simulate('click');
    expect(requiredProps.onChange).toBeCalledTimes(0);
  });

  it('should call onChange if user presses enter or space keys', () => {
    [KEY_CODES.ENTER, KEY_CODES.SPACEBAR].forEach((keyCode) => {
      requiredProps.onChange.mockClear();
      const wrapper = shallow(<ButtonGroup {...requiredProps} />);

      const item = wrapper.childAt(0);
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      item.simulate('keydown', { keyCode, preventDefault: () => {} });
      expect(requiredProps.onChange).toBeCalledTimes(1);
    });
  });

  it("shouldn't call onChange if user presses enter or space keys and button is disabled", () => {
    [KEY_CODES.ENTER, KEY_CODES.SPACEBAR].forEach((keyCode) => {
      const props = {
        ...requiredProps,
        list: [
          {
            ...requiredProps.list[0],
            disabled: true,
          },
        ],
      };

      const wrapper = shallow(<ButtonGroup {...props} />);

      const item = wrapper.childAt(0);
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      item.simulate('keydown', { keyCode, preventDefault: () => {} });
      expect(requiredProps.onChange).toBeCalledTimes(0);
    });
  });
});

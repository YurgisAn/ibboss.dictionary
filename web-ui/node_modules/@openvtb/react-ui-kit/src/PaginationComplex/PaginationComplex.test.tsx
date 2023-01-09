import React, { ReactNode } from 'react';
import { act } from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';

import { PaginationComplex } from '../PaginationComplex';
import { KEY_CODES } from '../common';

import { Buttons } from './Buttons';
import { Dropdown } from './Dropdown';

jest.mock('../common', () => ({
  DEFAULT_THEME: {
    borderRadius: '',
    boxShadow: {
      8: '',
    },
    color: {
      neutral: {
        10: '',
        20: '',
        30: '',
        50: '',
      },
      primary: {
        60: '',
      },
    },
  },
  KEY_CODES: {
    DOWN: 40,
    ENTER: 13,
  },
}));

jest.mock('../Icons/system/ChevronLeftOutline.svg', () => ({
  // eslint-disable-next-line react/display-name
  ReactComponent: () => <div> {'<'} </div>,
}));
jest.mock('/../Icons/system/ChevronRightOutline.svg', () => ({
  // eslint-disable-next-line react/display-name
  ReactComponent: () => <div> {'>'} </div>,
}));
jest.mock('../Icons/system/ChevronDownOutline.svg', () => ({
  // eslint-disable-next-line react/display-name
  ReactComponent: () => <div> v </div>,
}));
jest.mock('/../Icons/system/ChevronUpOutline.svg', () => ({
  // eslint-disable-next-line react/display-name
  ReactComponent: () => <div> {'/\\'} </div>,
}));

jest.mock('../Typography', () => ({
  // eslint-disable-next-line react/display-name
  Body2Long: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('PaginationComplex', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const arrowDown = new KeyboardEvent('keydown');
  Object.defineProperty(arrowDown, 'keyCode', {
    get: () => KEY_CODES.DOWN,
  });

  const enter = new KeyboardEvent('keydown');
  Object.defineProperty(enter, 'keyCode', {
    get: () => KEY_CODES.ENTER,
  });

  const props = {
    itemsPerPage: 20,
    page: 1,
    totalItems: 113,
    onItemsPerPageChange: jest.fn(),
    onPageChange: jest.fn(),
  };

  it('should render component', () => {
    const wrapper = shallow(<PaginationComplex {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onPageChange with next page when user clicks right button', () => {
    const wrapper = shallow(<PaginationComplex {...props} />);
    const rightButton = wrapper.childAt(1).dive().childAt(5).dive().childAt(1);
    rightButton.simulate('click');
    expect(props.onPageChange).toBeCalledWith(props.page + 1);
  });

  it('should call onPageChange with previous page when user clicks left button', () => {
    const page = 2;
    const wrapper = shallow(<PaginationComplex {...props} page={page} />);
    const leftButton = wrapper.childAt(1).dive().childAt(5).dive().childAt(0);
    leftButton.simulate('click');
    expect(props.onPageChange).toBeCalledWith(page - 1);
  });

  it("shouldn't call onPageChange with next page when user clicks right button and component shows last page", () => {
    const page = Math.ceil(props.totalItems / props.itemsPerPage);
    const wrapper = mount(<PaginationComplex {...props} page={page} />);
    const rightButton = wrapper.find(Buttons).find('button').last();
    rightButton.simulate('click');
    expect(props.onPageChange).toBeCalledTimes(0);
  });

  it("shouldn't call onPageChange with previous page when user clicks right button and component shows first page", () => {
    const wrapper = mount(<PaginationComplex {...props} />);
    const leftButton = wrapper.find(Buttons).find('button').first();
    leftButton.simulate('click');
    expect(props.onPageChange).toBeCalledTimes(0);
  });

  it("shouldn't call onPageChange when user clicks buttons and there is only one page", () => {
    const wrapper = mount(<PaginationComplex {...props} totalItems={props.itemsPerPage} />);
    const leftButton = wrapper.find(Buttons).find('button').first();
    const rightButton = wrapper.find(Buttons).find('button').last();
    leftButton.simulate('click');
    rightButton.simulate('click');
    expect(props.onPageChange).toBeCalledTimes(0);
  });

  it('should call onPageChange when user selects page with dropdown', () => {
    const wrapper = mount(<PaginationComplex {...props} />);
    const dropdown = wrapper.find(Dropdown).at(1).find('button');

    dropdown.simulate('click');
    act(() => {
      document.dispatchEvent(arrowDown);
      document.dispatchEvent(enter);
    });

    expect(props.onPageChange).toBeCalledTimes(1);
  });

  it('should call onItemsPerPageChange when user selects range with dropdown', () => {
    const wrapper = mount(<PaginationComplex {...props} />);
    const dropdown = wrapper.find(Dropdown).at(0).find('button');

    dropdown.simulate('click');
    act(() => {
      document.dispatchEvent(arrowDown);
      document.dispatchEvent(enter);
    });

    expect(props.onItemsPerPageChange).toBeCalledTimes(1);
  });
});

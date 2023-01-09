import React from 'react';
import { mount, shallow } from 'enzyme';

import { PaginationSimple } from '../PaginationSimple';
import type { IPaginationSimpleProps } from '../PaginationSimple';

jest.mock('../common', () => ({
  DEFAULT_THEME: {
    color: {
      neutral: {
        90: '',
        white: '',
      },
      opacity: {
        blackFocus: '',
      },
      primary: {
        60: '',
      },
    },
  },
  KEY_CODES: {
    ENTER: 13,
  },
}));

describe('PaginationSimple', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render pages without ellipsis if pages quantity is 7 or less', () => {
    const props: IPaginationSimpleProps = {
      currentPage: 1,
      pages: 7,
      onChange: jest.fn(),
    };

    const wrapper = shallow(<PaginationSimple {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render pages with ellipsis if pages quantity is 8 or more', () => {
    const props: IPaginationSimpleProps = {
      currentPage: 1,
      pages: 8,
      onChange: jest.fn(),
    };

    const wrapper = shallow(<PaginationSimple {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render input if pages quantity is 22 or more', () => {
    const props: IPaginationSimpleProps = {
      currentPage: 1,
      pages: 22,
      onChange: jest.fn(),
    };

    const wrapper = shallow(<PaginationSimple {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onChange with page the user clicks on', () => {
    const props: IPaginationSimpleProps = {
      currentPage: 1,
      pages: 7,
      onChange: jest.fn(),
    };

    const wrapper = shallow(<PaginationSimple {...props} />);
    const thirdPage = wrapper.childAt(1).childAt(2);

    thirdPage.simulate('click');
    expect(props.onChange).toBeCalledWith(3);
  });

  it('should call onChange with next page if user clicks on next page button', () => {
    const props: IPaginationSimpleProps = {
      currentPage: 1,
      pages: 7,
      onChange: jest.fn(),
    };

    const wrapper = shallow(<PaginationSimple {...props} />);
    const nextPageButton = wrapper.childAt(2);

    nextPageButton.simulate('click');
    expect(props.onChange).toBeCalledWith(2);
  });

  it('should call onChange with previous page if user clicks on previous page button', () => {
    const props: IPaginationSimpleProps = {
      currentPage: 2,
      pages: 7,
      onChange: jest.fn(),
    };

    const wrapper = shallow(<PaginationSimple {...props} />);
    const previousPageButton = wrapper.childAt(0);

    previousPageButton.simulate('click');
    expect(props.onChange).toBeCalledWith(1);
  });

  it('should call onChange with next available page if user clicks on next page button, but next page is disabled', () => {
    const props: IPaginationSimpleProps = {
      currentPage: 1,
      disabledPages: [2],
      pages: 7,
      onChange: jest.fn(),
    };

    const wrapper = shallow(<PaginationSimple {...props} />);
    const nextPageButton = wrapper.childAt(2);

    nextPageButton.simulate('click');
    expect(props.onChange).toBeCalledWith(3);
  });

  it('should call onChange with previous available page if user clicks on previous page button, but previous page is disabled', () => {
    const props: IPaginationSimpleProps = {
      currentPage: 3,
      disabledPages: [2],
      pages: 7,
      onChange: jest.fn(),
    };

    const wrapper = shallow(<PaginationSimple {...props} />);
    const previousPageButton = wrapper.childAt(0);

    previousPageButton.simulate('click');
    expect(props.onChange).toBeCalledWith(1);
  });

  it('should call onChange with input value when user blurs input', () => {
    const props: IPaginationSimpleProps = {
      currentPage: 1,
      pages: 22,
      onChange: jest.fn(),
    };

    const wrapper = mount(<PaginationSimple {...props} />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: '10' } });
    wrapper.update();
    input.simulate('blur');

    expect(props.onChange).toBeCalledWith(10);
  });

  it('should call onChange with input value when user presses enter', () => {
    const props: IPaginationSimpleProps = {
      currentPage: 1,
      pages: 22,
      onChange: jest.fn(),
    };

    const wrapper = mount(<PaginationSimple {...props} />);
    const input = wrapper.find('input');
    const inputNode: HTMLInputElement = input.getDOMNode();
    inputNode.blur = () => input.simulate('blur');

    input.simulate('change', { target: { value: '10' } });
    wrapper.update();
    input.simulate('keydown', { keyCode: 13 });

    expect(props.onChange).toBeCalledWith(10);
  });

  it('should call onChange with first page, if input value is less than 1', () => {
    const props: IPaginationSimpleProps = {
      currentPage: 1,
      pages: 22,
      onChange: jest.fn(),
    };

    const wrapper = mount(<PaginationSimple {...props} />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: '0' } });
    wrapper.update();
    input.simulate('blur');

    expect(props.onChange).toBeCalledWith(1);
  });

  it('should call onChange with last page, if input value is more than pages quantity', () => {
    const props: IPaginationSimpleProps = {
      currentPage: 1,
      pages: 22,
      onChange: jest.fn(),
    };

    const wrapper = mount(<PaginationSimple {...props} />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: '23' } });
    wrapper.update();
    input.simulate('blur');

    expect(props.onChange).toBeCalledWith(props.pages);
  });
});

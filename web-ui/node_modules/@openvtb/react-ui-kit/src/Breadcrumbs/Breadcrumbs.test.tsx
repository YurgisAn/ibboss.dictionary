import React, { ReactNode } from 'react';
import { mount, shallow } from 'enzyme';

import { Breadcrumbs } from '../Breadcrumbs';
import { KEY_CODES } from '../common';

jest.mock('../common', () => ({
  DEFAULT_THEME: {
    color: {
      neutral: {
        50: '',
      },
      primary: {
        60: '',
      },
    },
  },
  KEY_CODES: {
    ENTER: 13,
    LEFT: 37,
    RIGHT: 39,
  },
}));

jest.mock('../Typography', () => ({
  // eslint-disable-next-line react/display-name
  Body2Short: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  // eslint-disable-next-line react/display-name
  Body1Short: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

jest.mock('../OverflowMenu', () => {
  const OverflowMenu = () => <div />;
  return { OverflowMenu };
});

describe('Breadcrumbs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const props = {
    list: [
      {
        label: 'Breadcrumb 1',
        url: '#1',
      },
      {
        label: 'Breadcrumb 2',
        url: '#2',
      },
      {
        label: 'Breadcrumb 3',
        url: '#3',
      },
      {
        label: 'Breadcrumb 4',
      },
    ],
  };

  it('should render component', () => {
    const wrapper = shallow(<Breadcrumbs {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with small size', () => {
    const wrapper = shallow(<Breadcrumbs {...props} small />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should open correct url when user clicks on breadcrumbs' item", () => {
    window.location.assign = jest.fn();
    const wrapper = shallow(<Breadcrumbs {...props} />);
    const item = wrapper.childAt(0).dive();
    item.simulate('click');
    expect(window.location.assign).toHaveBeenCalledWith(props.list[0].url);
  });

  it('should open correct url when user presses enter and component in focus', () => {
    window.location.assign = jest.fn();
    const wrapper = shallow(<Breadcrumbs {...props} />);
    wrapper.simulate('focus', { currentTarget: 1, target: 1 });
    wrapper.simulate('keydown', { keyCode: KEY_CODES.ENTER });

    expect(window.location.assign).toHaveBeenCalledWith(props.list[0].url);
  });

  it('should highlight next item when user presses right arrow', () => {
    window.location.assign = jest.fn();
    const wrapper = shallow(<Breadcrumbs {...props} />);
    wrapper.simulate('focus', { currentTarget: 1, target: 1 });
    wrapper.simulate('keydown', { keyCode: KEY_CODES.RIGHT });
    wrapper.simulate('keydown', { keyCode: KEY_CODES.RIGHT });
    wrapper.simulate('keydown', { keyCode: KEY_CODES.ENTER });

    expect(window.location.assign).toHaveBeenCalledWith(props.list[2].url);
  });

  it('should highlight previous item when user presses left arrow', () => {
    window.location.assign = jest.fn();
    const wrapper = shallow(<Breadcrumbs {...props} />);
    wrapper.simulate('focus', { currentTarget: 1, target: 1 });
    wrapper.simulate('keydown', { keyCode: KEY_CODES.RIGHT });
    wrapper.simulate('keydown', { keyCode: KEY_CODES.RIGHT });
    wrapper.simulate('keydown', { keyCode: KEY_CODES.LEFT });
    wrapper.simulate('keydown', { keyCode: KEY_CODES.ENTER });

    expect(window.location.assign).toHaveBeenCalledWith(props.list[1].url);
  });

  it('should render overflow menu if breadcrumbs are wider then 800px', () => {
    let widthChecks = 1;

    const wrapper = mount(<Breadcrumbs {...props} />);
    const wrapperNode = wrapper.getDOMNode();

    wrapperNode.getBoundingClientRect = (): DOMRect => {
      if (widthChecks) {
        widthChecks = 0;
        return {
          bottom: 0,
          height: 0,
          left: 0,
          right: 0,
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          toJSON: () => {},
          top: 0,
          width: 900,
          x: 0,
          y: 0,
        };
      } else {
        return {
          bottom: 0,
          height: 0,
          left: 0,
          right: 0,
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          toJSON: () => {},
          top: 0,
          width: 700,
          x: 0,
          y: 0,
        };
      }
    };

    wrapper.setProps(props);
    wrapper.update();

    expect(wrapper.find('OverflowMenu')).toHaveLength(1);
  });
});

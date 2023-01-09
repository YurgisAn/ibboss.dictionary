import React, { ReactNode } from 'react';
import { mount, shallow } from 'enzyme';

import { Body2Long } from '../Typography';
import { createHintHOC } from '../HintHOC';
import type { IHintHOCProps } from '../HintHOC';

import { Hint } from './Hint';
import { CloseIconWrapper } from './CloseIconWrapper';
import { SIZES } from './constants';

type Align = IHintHOCProps['align'];
type Direction = IHintHOCProps['direction'];
type Size = IHintHOCProps['size'];

jest.mock('../Icons/service/СloseOutline.svg', () => ({
  // eslint-disable-next-line react/display-name
  ReactComponent: () => <div>x</div>,
}));

jest.mock('../common', () => ({
  DEFAULT_THEME: {
    borderRadius: '',
    color: {
      neutral: {
        80: '',
        white: '',
      },
      primary: {
        40: '',
      },
    },
  },
  Z_INDEXES: {
    HINT: 777,
  },
  markerStyle: () => 'marker style',
}));

jest.mock('../Typography', () => ({
  // eslint-disable-next-line react/display-name
  Body2Long: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('HintHOC', () => {
  // jsdom defines the window innerWidth and innerHeight to be 1024 x 768
  const viewPortHeight = window.innerHeight;
  const viewPortWidth = window.innerWidth;

  const wrapperHeight = 20;
  const wrapperLeft = 30;
  const wrapperWidth = 100;

  const hintHeight = 90;
  const hintWidth = 120;

  const positions = {
    bottom: {
      left: { posX: -44, posY: 32 },
      center: { posX: -10, posY: 32 },
      right: { posX: 24, posY: 32 },
    },
    top: {
      left: { posX: -44, posY: -102 },
      center: { posX: -10, posY: -102 },
      right: { posX: 24, posY: -102 },
    },
  };

  const WrappedComponent = () => <div />;
  const WrappedComponentWithHint = createHintHOC(WrappedComponent);
  const mountWrappedComponentWithHint = (
    direction?: Direction,
    align?: Align,
    visible?: boolean,
    onRequestHide?: () => void
  ) =>
    mount(
      <WrappedComponentWithHint
        align={align}
        direction={direction}
        message=""
        visible={visible}
        onRequestHide={onRequestHide}
      />
    );

  const createGetBoundingClientRectMockFn = ({
    bottom = 0,
    height = 0,
    left = 0,
    right = 0,
    top = 0,
    width = 0,
  }: {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
    width?: number;
    height?: number;
  }) => (): DOMRect => ({
    bottom,
    left,
    right,
    top,
    width,
    height,
    x: left,
    y: top,
    toJSON: () => {
      // do nothing
    },
  });

  it('should render component', () => {
    const wrapper = shallow(<WrappedComponentWithHint message="" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render wrapped component', () => {
    const wrapper = shallow(<WrappedComponentWithHint message="" />);
    expect(wrapper.find(WrappedComponent)).toHaveLength(1);
  });

  it('should pass all props to wrapped component', () => {
    const props = {
      bar: 'bar',
      foo: 'foo',
      message: '',
    };
    const wrapper = shallow(<WrappedComponentWithHint {...props} />);
    const wrappedComponent = wrapper.find(WrappedComponent);
    expect(wrappedComponent.props()).toEqual(props);
  });

  it('should render hint with provided text using typography component', () => {
    const hintText = 'foo bar baz';
    const wrapper = shallow(<WrappedComponentWithHint message={hintText} />);
    const styledComponent = wrapper.find(Body2Long);
    expect(styledComponent.prop('children')).toEqual(hintText);
  });

  it('should render hint with provided size', () => {
    const hintText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    const sizes: Array<Size> = [undefined, 'big', 'medium', 'small'];
    sizes.forEach((size: Size) => {
      const wrapper = shallow(<WrappedComponentWithHint size={size} message={hintText} />);
      const hint = wrapper.find(Hint);
      expect(hint.prop('width')).toEqual(size ? SIZES[size] : SIZES['big']);
    });
  });

  it("shouldn't show hint right after component has been rendered", () => {
    const wrapper = mountWrappedComponentWithHint();
    const hint = wrapper.find(Hint);
    expect(hint.prop('visible')).toBeFalsy();
  });

  it('should show hint when mouse has been clicked on wrapped component', () => {
    const wrapper = mountWrappedComponentWithHint();
    wrapper.setProps({ visible: true });
    const hint = wrapper.find(Hint);
    expect(hint.prop('visible')).toBeTruthy();
  });

  it('should call onRequestHide when mouse has been clicked on "Close" icon', () => {
    let onRequestHideCalled = false;
    const wrapper = mountWrappedComponentWithHint('bottom', 'left', true, () => {
      wrapper.setProps({ visible: false });
      onRequestHideCalled = true;
    });
    expect(onRequestHideCalled).toBeFalsy();
    expect(wrapper.find(Hint).prop('visible')).toBeTruthy();

    const closeIcon = wrapper.find(CloseIconWrapper);
    closeIcon.simulate('click');
    expect(onRequestHideCalled).toBeTruthy();
    expect(wrapper.find(Hint).prop('visible')).toBeFalsy();
  });

  it('should render hint in bottom direction/left align by default if direction/align are not provided and there are left and bottom space available', () => {
    const wrapper = mountWrappedComponentWithHint();

    const wrapperNode = wrapper.getDOMNode();
    wrapperNode.getBoundingClientRect = createGetBoundingClientRectMockFn({
      left: hintWidth + wrapperLeft,
      width: wrapperWidth,
      height: wrapperHeight,
    });

    const hintNode = wrapper.find(Hint).getDOMNode();
    hintNode.getBoundingClientRect = createGetBoundingClientRectMockFn({
      width: hintWidth,
      height: hintHeight,
    });

    wrapper.setProps({ visible: true });
    wrapper.update();

    const hint = wrapper.find(Hint);
    const hintPosition = {
      posX: hintWidth + wrapperLeft + positions.bottom.left.posX,
      posY: positions.bottom.left.posY,
    };
    expect(hint.prop('position')).toEqual(hintPosition);
  });

  it('should render hint in bottom direction/right align by default if direction/align are not provided and there are no left space available', () => {
    const wrapper = mountWrappedComponentWithHint();

    const wrapperNode = wrapper.getDOMNode();
    wrapperNode.getBoundingClientRect = createGetBoundingClientRectMockFn({
      left: wrapperLeft,
      width: wrapperWidth,
      height: wrapperHeight,
    });

    const hintNode = wrapper.find(Hint).getDOMNode();
    hintNode.getBoundingClientRect = createGetBoundingClientRectMockFn({
      width: hintWidth,
      height: hintHeight,
    });

    wrapper.setProps({ visible: true });
    wrapper.update();

    const hintPosition = {
      posX: wrapperLeft + positions.bottom.right.posX,
      posY: positions.bottom.right.posY,
    };
    expect(wrapper.find(Hint).prop('position')).toEqual(hintPosition);
  });

  it('should render hint with big width in bottom direction/center align by default if direction/align are not provided in case of there are no left and no right space available', () => {
    const offset = 6;
    const wrapper = mountWrappedComponentWithHint();

    const wrapperNode = wrapper.getDOMNode();
    wrapperNode.getBoundingClientRect = createGetBoundingClientRectMockFn({
      left: (viewPortWidth - wrapperWidth) / 2,
      width: wrapperWidth,
      height: wrapperHeight,
    });

    const bigHintWidth = viewPortWidth - offset;
    const hintNode = wrapper.find(Hint).getDOMNode();
    hintNode.getBoundingClientRect = createGetBoundingClientRectMockFn({
      width: bigHintWidth,
      height: hintHeight,
    });

    wrapper.setProps({ visible: true });
    wrapper.update();

    const hint = wrapper.find(Hint);
    expect(hint.prop('position')).toEqual({
      posX: offset / 2,
      posY: positions.bottom.center.posY,
    });
  });

  it('should render hint in top direction/left align if direction/align is not provided in case of there are no bottom, but left space available', () => {
    const wrapper = mountWrappedComponentWithHint();

    const wrapperNode = wrapper.getDOMNode();
    wrapperNode.getBoundingClientRect = createGetBoundingClientRectMockFn({
      bottom: viewPortHeight,
      left: hintWidth + wrapperLeft,
      width: wrapperWidth,
      height: wrapperHeight,
    });

    const hintNode = wrapper.find(Hint).getDOMNode();
    hintNode.getBoundingClientRect = createGetBoundingClientRectMockFn({
      width: hintWidth,
      height: hintHeight,
    });

    wrapper.setProps({ visible: true });
    wrapper.update();

    const hintPosition = {
      posX: hintWidth + wrapperLeft + positions.top.left.posX,
      posY: positions.top.left.posY,
    };
    const hint = wrapper.find(Hint);
    expect(hint.prop('position')).toEqual(hintPosition);
  });

  it('should render hint with or without provided direction and align', () => {
    const directions: Array<Direction> = [undefined, 'bottom', 'top'];
    const aligns: Array<Align> = [undefined, 'left', 'center', 'right'];
    directions.forEach((direction) => {
      aligns.forEach((align) => {
        const wrapper = mountWrappedComponentWithHint(direction, align);

        const wrapperNode = wrapper.getDOMNode();
        wrapperNode.getBoundingClientRect = createGetBoundingClientRectMockFn({
          height: wrapperHeight,
          width: wrapperWidth,
        });

        const hintNode = wrapper.find(Hint).getDOMNode();
        hintNode.getBoundingClientRect = createGetBoundingClientRectMockFn({
          width: hintWidth,
          height: hintHeight,
        });

        wrapper.setProps({ visible: true });
        wrapper.update();

        const hintPosition = positions[direction ?? 'bottom'][align ?? 'right'];
        const hint = wrapper.find(Hint);
        expect(hint.prop('position')).toEqual(hintPosition);
      });
    });
  });
});

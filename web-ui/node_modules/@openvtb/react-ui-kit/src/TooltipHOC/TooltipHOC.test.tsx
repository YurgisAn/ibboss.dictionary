import React, { ReactNode } from 'react';
import { mount, shallow } from 'enzyme';

import { Caption1 } from '../Typography';
import { createTooltipHOC } from '../TooltipHOC';
import type { ITooltipHOCProps } from '../TooltipHOC';

import { Tooltip } from './Tooltip';

jest.mock('../common', () => ({
  DEFAULT_THEME: {
    borderRadius: '',
    color: {
      neutral: {
        80: '',
        white: '',
      },
    },
  },
  Z_INDEXES: {
    TOOLTIP: 777,
  },
}));

jest.mock('../Typography', () => ({
  // eslint-disable-next-line react/display-name
  Caption1: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('TooltipHOC', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    jest.clearAllTimers();
  });

  // jsdom defines innerWidth and innerHeight as 1024 x 768
  const viewPortWidth = window.innerWidth;
  const viewPortHeight = window.innerHeight;

  const wrapperHeight = 20;
  const wrapperLeft = 30;
  const wrapperWidth = 100;

  const tooltipWidth = 120;

  const WrappedComponent = () => <div />;
  const WrappedComponentWithTooltip = createTooltipHOC(WrappedComponent);

  const mountWrappedComponentWithTooltip = (
    direction?: ITooltipHOCProps['direction'],
    withDelay?: ITooltipHOCProps['withDelay']
  ) =>
    mount(<WrappedComponentWithTooltip direction={direction} tooltip="" withDelay={withDelay} />);

  const getTooltipPosition = (direction: ITooltipHOCProps['direction']) => {
    switch (direction) {
      case 'top':
        return {
          posX: 20,
          posY: -8,
        };

      case 'left':
        return {
          posX: -98,
          posY: 10,
        };

      case 'right':
        return {
          posX: 138,
          posY: 10,
        };

      case 'bottom':
      default:
        return {
          posX: 20,
          posY: 28,
        };
    }
  };

  const createGetBoundingClientRectMockFn = ({
    bottom = 0,
    height = 0,
    left = 0,
    right = 0,
    top = 0,
    width = 0,
  }: {
    bottom?: number;
    height?: number;
    left?: number;
    right?: number;
    top?: number;
    width?: number;
  }) => (): DOMRect => ({
    bottom,
    height,
    left,
    right,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    toJSON: () => {},
    top,
    width,
    x: left,
    y: top,
  });

  it('should render component', () => {
    const wrapper = shallow(<WrappedComponentWithTooltip tooltip="" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render wrapped component', () => {
    const wrapper = shallow(<WrappedComponentWithTooltip tooltip="" />);
    expect(wrapper.find(WrappedComponent)).toHaveLength(1);
  });

  it('should pass all props to wrapped component', () => {
    const props = {
      bar: 'bar',
      foo: 'foo',
      tooltip: '',
    };
    const wrapper = shallow(<WrappedComponentWithTooltip {...props} />);
    const wrappedComponent = wrapper.find(WrappedComponent);
    expect(wrappedComponent.props()).toEqual(props);
  });

  it('should render tooltip with provided text using typography component', () => {
    const tooltipText = 'foo bar baz';
    const wrapper = shallow(<WrappedComponentWithTooltip tooltip={tooltipText} />);
    const styledComponent = wrapper.find(Caption1);
    expect(styledComponent.prop('children')).toEqual(tooltipText);
  });

  it("shouldn't show tooltip right after component has been rendered", () => {
    const wrapper = mountWrappedComponentWithTooltip();
    const tooltip = wrapper.find(Tooltip);
    expect(tooltip.prop('showTooltip')).toBe(false);
  });

  it('should show tooltip when mouse enters component', () => {
    const wrapper = mountWrappedComponentWithTooltip();

    wrapper.simulate('mouseEnter');
    jest.runAllTimers();
    wrapper.update();

    const tooltip = wrapper.find(Tooltip);
    expect(tooltip.prop('showTooltip')).toBe(true);
  });

  it('should hide tooltip when mouse leaves component', () => {
    const wrapper = mountWrappedComponentWithTooltip();

    wrapper.simulate('mouseEnter');
    jest.runAllTimers();
    wrapper.update();

    wrapper.simulate('mouseLeave');
    jest.runAllTimers();
    wrapper.update();

    const tooltip = wrapper.find(Tooltip);
    expect(tooltip.prop('showTooltip')).toBe(false);
  });

  it('should show tooltip with 1.5 seconds delay if prop "withDelay" is provided', () => {
    const wrapper = mountWrappedComponentWithTooltip(undefined, true);

    wrapper.simulate('mouseEnter');
    jest.advanceTimersByTime(1500);
    wrapper.update();

    const tooltip = wrapper.find(Tooltip);
    expect(tooltip.prop('showTooltip')).toBe(true);
  });

  it('should render tooltip in bottom direction by default if direction is not provided', () => {
    const wrapper = mountWrappedComponentWithTooltip();

    const wrapperNode = wrapper.getDOMNode();
    wrapperNode.getBoundingClientRect = createGetBoundingClientRectMockFn({
      height: wrapperHeight,
      left: wrapperLeft,
      width: wrapperWidth,
    });

    const tooltipNode = wrapper.find(Tooltip).getDOMNode();
    tooltipNode.getBoundingClientRect = createGetBoundingClientRectMockFn({
      width: tooltipWidth,
    });

    wrapper.simulate('mouseEnter');
    jest.runAllTimers();
    wrapper.update();

    const tooltipPosition = getTooltipPosition('bottom');

    const tooltip = wrapper.find(Tooltip);
    expect(tooltip.prop('position')).toEqual(tooltipPosition);
  });

  it('should render tooltip in top direction if there is no space bottom and direction is not provided', () => {
    const wrapper = mountWrappedComponentWithTooltip();

    const wrapperNode = wrapper.getDOMNode();
    wrapperNode.getBoundingClientRect = createGetBoundingClientRectMockFn({
      bottom: viewPortHeight,
      height: wrapperHeight,
      left: wrapperLeft,
      width: wrapperWidth,
    });

    const tooltipNode = wrapper.find(Tooltip).getDOMNode();
    tooltipNode.getBoundingClientRect = createGetBoundingClientRectMockFn({
      width: tooltipWidth,
    });

    wrapper.simulate('mouseEnter');
    jest.runAllTimers();
    wrapper.update();

    const tooltipPosition = getTooltipPosition('top');

    const tooltip = wrapper.find(Tooltip);
    expect(tooltip.prop('position')).toEqual(tooltipPosition);
  });

  it('should render tooltip in left direction if tooltip is wider than wrapped component, there is no space right and direction is not provided', () => {
    const wrapper = mountWrappedComponentWithTooltip();

    const wrapperNode = wrapper.getDOMNode();
    wrapperNode.getBoundingClientRect = createGetBoundingClientRectMockFn({
      height: wrapperHeight,
      left: wrapperLeft,
      right: viewPortWidth,
      width: wrapperWidth,
    });

    const tooltipNode = wrapper.find(Tooltip).getDOMNode();
    tooltipNode.getBoundingClientRect = createGetBoundingClientRectMockFn({
      width: tooltipWidth,
    });

    wrapper.simulate('mouseEnter');
    jest.runAllTimers();
    wrapper.update();

    const tooltipPosition = getTooltipPosition('left');

    const tooltip = wrapper.find(Tooltip);
    expect(tooltip.prop('position')).toEqual(tooltipPosition);
  });

  it('should render tooltip in right direction if tooltip is wider than wrapped component, there is no space left and direction is not provided', () => {
    const wrapper = mountWrappedComponentWithTooltip();

    const wrapperNode = wrapper.getDOMNode();
    wrapperNode.getBoundingClientRect = createGetBoundingClientRectMockFn({
      height: wrapperHeight,
      width: wrapperWidth,
    });

    const tooltipNode = wrapper.find(Tooltip).getDOMNode();
    tooltipNode.getBoundingClientRect = createGetBoundingClientRectMockFn({
      width: tooltipWidth,
    });

    wrapper.simulate('mouseEnter');
    jest.runAllTimers();
    wrapper.update();

    const tooltipPosition = { posX: 108, posY: 10 };

    const tooltip = wrapper.find(Tooltip);
    expect(tooltip.prop('position')).toEqual(tooltipPosition);
  });

  it('should render tooltip in provided direction', () => {
    const directions: ITooltipHOCProps['direction'][] = ['bottom', 'left', 'right', 'top'];
    directions.forEach((direction) => {
      const wrapper = mountWrappedComponentWithTooltip(direction);

      const wrapperNode = wrapper.getDOMNode();
      wrapperNode.getBoundingClientRect = createGetBoundingClientRectMockFn({
        height: wrapperHeight,
        width: wrapperWidth,
        left: wrapperLeft,
      });

      const tooltipNode = wrapper.find(Tooltip).getDOMNode();
      tooltipNode.getBoundingClientRect = createGetBoundingClientRectMockFn({
        width: tooltipWidth,
      });

      wrapper.simulate('mouseEnter');
      jest.runAllTimers();
      wrapper.update();

      const tooltipPosition = getTooltipPosition(direction);

      const tooltip = wrapper.find(Tooltip);
      expect(tooltip.prop('position')).toEqual(tooltipPosition);
    });
  });
});

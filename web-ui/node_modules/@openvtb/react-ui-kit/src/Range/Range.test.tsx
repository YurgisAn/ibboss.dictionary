import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { Input } from '../Inputs/BaseField';
import { Range } from '../Range';

import { ValueStart, ValueEnd, SliderCircle } from './StyledComponents';
import { RangePoints } from './RangePoints';

jest.mock('../common', () => ({
  DEFAULT_THEME: {
    borderRadius: '',
    boxShadow: {},
    input: { iconPaddingTop: {} },
    color: {
      neutral: {},
      primary: {},
      opacity: {},
      error: {},
      success: {},
    },
  },
  Z_INDEXES: {
    TOOLTIP: 777,
  },
}));

describe('Range', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const spyOn = jest.fn();

  const rangeProps = {
    minValue: 10,
    maxValue: 100,
    step: 2,
    disabled: false,
    onChange: spyOn,
    value: '',
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const event = { preventDefault: () => {}, stopPropagation: () => {} };

  it('should render component with value and onChange', () => {
    const wrapper = shallow(<Range value="" onChange={spyOn} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with full props', () => {
    const wrapper = shallow(<Range {...rangeProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with ranges prop', () => {
    const wrapper = shallow(<Range ranges={[{ value: 20 }, { value: 40 }]} {...rangeProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with input', () => {
    const wrapper = shallow(<Range inInput {...rangeProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onClick when user clicks on value start', () => {
    const wrapper = mount(<Range {...rangeProps} width={300} />);

    const input = wrapper.find(ValueStart);
    act(() => {
      input.props().onMouseDown(event);
    });

    expect(spyOn).toBeCalledTimes(1);
  });

  it('should call onClick when user clicks on value end', () => {
    const wrapper = mount(<Range {...rangeProps} width={300} />);

    const input = wrapper.find(ValueEnd);
    act(() => {
      input.props().onMouseDown(event);
    });

    expect(spyOn).toBeCalledTimes(1);
  });

  it('should call onClick when user clicks on value range', () => {
    const wrapper = mount(
      <Range {...rangeProps} ranges={[{ value: 20 }, { value: 40 }]} width={300} />
    );
    const input = wrapper.find(RangePoints).childAt(0);

    act(() => {
      input.props().onMouseDown(event);
    });

    expect(spyOn).toBeCalledTimes(1);
  });

  it('should call onTouchStart when user touches on circle slider', () => {
    const wrapper = mount(
      <Range {...rangeProps} ranges={[{ value: 20 }, { value: 40 }]} width={300} />
    );

    const input = wrapper.find(SliderCircle);

    input.simulate('touchStart', { touches: { clientX: 100, clientY: 0 } });
    input.simulate('touchMove', {
      changedTouches: { clientX: 200, clientY: 0 },
    });
    input.simulate('touchEnd', {
      changedTouches: { clientX: 200, clientY: 0 },
    });
    expect(spyOn).toHaveBeenCalled();
  });

  it('should call onChange when user presses keys in input field', () => {
    const event: any = { target: { value: `500` } };
    const value = '500';
    const wrapper = mount(
      <Range {...rangeProps} inInput ranges={[{ value: 20 }, { value: 40 }]} width={300} />
    );

    const input = wrapper.find(Input);

    act(() => {
      input.props().onChange?.(event, value);
    });

    expect(spyOn).toBeCalledWith({ target: { value: '500' } }, '500');
  });
});

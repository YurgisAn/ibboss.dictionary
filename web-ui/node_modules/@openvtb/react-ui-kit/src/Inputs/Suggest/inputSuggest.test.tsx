import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { Input } from '../index';
import { InputSkeleton } from '../BaseField/InputSkeleton';
import { InputComponent } from '../BaseField/StyledComponents';

import { DEFAULT_NOOP_MESSAGE, DEFAULT_LOAD_MESSAGE } from './constants';
import { OptionWrapper, TextWrapper } from './styled-components';
import { DropDownMenu } from './DropDownMenu';
import { Option } from './Option';

import type { IOptionSuggest } from './index';

describe('Input.Suggest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const inputSuggestProps = {
    options: ['testValue', 'testValue'],
    onChange: (value: any) => value,
  };
  const testValue = [
    { id: 1, label: 'Москва' },
    { id: 2, label: 'Мо' },
    { id: 3, label: 'Мос' },
    { id: 4, label: 'LA' },
    { id: 6, label: 'Chicago' },
  ];

  it('should render input suggest', () => {
    const wrapper = shallow(<Input.Suggest {...inputSuggestProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render input suggest with small size', () => {
    const wrapper = shallow(<Input.Suggest {...inputSuggestProps} size={'small'} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render input suggest with micro size', () => {
    const wrapper = shallow(<Input.Suggest {...inputSuggestProps} size={'micro'} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onChange when user presses keys in input field', () => {
    const changeSpy = jest.fn();
    const wrapper = mount(<Input.Suggest {...inputSuggestProps} onInputChange={changeSpy} />);
    const input = wrapper.find(InputSkeleton).find(InputComponent);
    input.simulate('change', { target: { value: 'Changed' } });
    expect(changeSpy).toHaveBeenCalled();
    expect(changeSpy).toBeCalledTimes(1);
  });

  it('should render input suggest with Array object', () => {
    const wrapper = shallow(
      <Input.Suggest
        options={testValue}
        onChange={(value) => value}
        menuIsOpen
        charsToShowSuggest={0}
      />
    );
    const option = (index) =>
      wrapper.find(DropDownMenu).dive().children().childAt(index).prop('label');
    expect(option(0)).toBe('Москва');
    expect(option(1)).toBe('Мо');
    expect(option(2)).toBe('Мос');
    expect(option(3)).toBe('LA');
    expect(option(4)).toBe('Chicago');
  });

  it('should render input suggest with custom option', () => {
    const wrapper = shallow(
      <Input.Suggest
        options={testValue}
        renderElementOption={(options: any) => (
          <div>
            <button>Нажми меня</button>
            {options.id} {options.label}
          </div>
        )}
        onChange={(value) => value}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render input suggest one option', () => {
    const changeSpy = jest.fn();
    const wrapper = mount(
      <Input.Suggest onInputChange={changeSpy} options={testValue} onChange={(value) => value} />
    );

    const input = wrapper.find(InputSkeleton).find(InputComponent);
    input.simulate('change', { target: { value: 'Москва' } });
    expect(changeSpy).toHaveBeenCalled();
    expect(changeSpy).toBeCalledTimes(1);
    const option = wrapper.find(DropDownMenu).find(Option);
    expect(option.prop('label')).toBe('Москва');
    expect(option.children()).toHaveLength(1);
  });

  it('It should render input suggest options if there is match', () => {
    const changeSpy = jest.fn();
    const wrapper = mount(
      <Input.Suggest
        onInputChange={changeSpy}
        menuIsOpen
        charsToShowSuggest={0}
        options={testValue}
        onChange={(value) => value}
      />
    );

    const input = wrapper.find(InputSkeleton).find(InputComponent);
    input.simulate('change', { target: { value: 'Мо' } });
    expect(changeSpy).toHaveBeenCalled();
    expect(changeSpy).toBeCalledTimes(1);
    const option = wrapper.find(DropDownMenu).find(Option);
    expect(option.children()).toHaveLength(3);
  });

  it('should render input suggest noop message,', () => {
    const changeSpy = jest.fn();
    const wrapper = mount(
      <Input.Suggest
        onInputChange={changeSpy}
        menuIsOpen
        charsToShowSuggest={0}
        options={testValue}
        onChange={(value) => value}
      />
    );

    const input = wrapper.find(InputSkeleton).find(InputComponent);
    input.simulate('change', { target: { value: 'Test' } });
    expect(changeSpy).toHaveBeenCalled();
    expect(changeSpy).toBeCalledTimes(1);
    const option = wrapper.find(DropDownMenu).find(Option);
    expect(option.children()).toHaveLength(1);
    expect(option.prop('tooltipMessage')).toBe(DEFAULT_NOOP_MESSAGE);
  });

  it('should render input suggest load message', () => {
    const changeSpy = jest.fn();
    const wrapper = mount(
      <Input.Suggest
        onInputChange={changeSpy}
        menuIsOpen
        charsToShowSuggest={0}
        options={testValue}
        load
        onChange={(value) => value}
      />
    );

    const input = wrapper.find(InputSkeleton).find(InputComponent);
    input.simulate('change', { target: { value: 'Test' } });
    expect(changeSpy).toHaveBeenCalled();
    expect(changeSpy).toBeCalledTimes(1);
    const option = wrapper.find(DropDownMenu).find(Option);
    expect(option.children()).toHaveLength(1);
    expect(option.prop('tooltipMessage')).toBe(DEFAULT_LOAD_MESSAGE);
  });

  it('should call onChange when user click option', () => {
    const changeSpy = jest.fn();
    let resultValue: string | IOptionSuggest = '';
    const wrapper = mount(
      <Input.Suggest
        onInputChange={changeSpy}
        options={testValue}
        menuIsOpen
        charsToShowSuggest={0}
        onChange={(value: string | IOptionSuggest) => (resultValue = value)}
      />
    );

    const input = wrapper.find(InputSkeleton).find(InputComponent);
    input.simulate('change', { target: { value: 'Мо' } });
    expect(changeSpy).toHaveBeenCalled();
    expect(changeSpy).toBeCalledTimes(1);
    const options = wrapper.find(DropDownMenu).find(Option);
    options.forEach((option, index) => {
      if (index === 0) {
        act(() => {
          option.find(OptionWrapper).find(TextWrapper).simulate('click');
        });
      }
    });

    expect(JSON.stringify(resultValue)).toBe(JSON.stringify(testValue[0]));
  });
});

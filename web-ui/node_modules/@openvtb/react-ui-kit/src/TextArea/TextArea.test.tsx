import React from 'react';
import { shallow } from 'enzyme';

import { TextArea } from './';

const testText =
  'С другой стороны рамки и место обучения кадров представляет собой интересный эксперимент проверки модели развития. Повседневная практика показывает, что консультация с широким активом обеспечивает широкому кругу (специалистов) участие в формировании форм развития. Идейные соображения высшего порядка, а также сложившаяся структура организации в значительной степени обуславливает создание соответствующий условий активизации. Таким образом консультация с широким активом представляет собой интересный эксперимент проверки систем массового участия.';

jest.mock('../common', () => ({
  DEFAULT_THEME: {},
}));

const handleOnChange = jest.fn();

describe('TextArea', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render component basically', () => {
    const wrapper = shallow(<TextArea />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with label', () => {
    const wrapper = shallow(<TextArea label="Label" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with limit information', () => {
    const wrapper = shallow(<TextArea limit={100} initialValue="Small text" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with label and limit information', () => {
    const wrapper = shallow(<TextArea label="Label" limit={100} initialValue="Small text" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with scrollbar and in default state', () => {
    const wrapper = shallow(<TextArea status={'default'} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with error state', () => {
    const wrapper = shallow(<TextArea limit={100} initialValue={testText} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render disabled component', () => {
    const wrapper = shallow(<TextArea disabled initialValue={testText} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render readonly component', () => {
    const wrapper = shallow(<TextArea readOnly initialValue={testText} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should react on value change and call onChange callback', () => {
    const wrapper = shallow(
      <TextArea
        elementClassname="test-textarea"
        onChange={handleOnChange}
        initialValue={testText}
      />
    );
    const textarea = wrapper.find('.test-textarea');
    textarea.simulate('change', { target: { value: 'Text' } });
    expect(handleOnChange).toBeCalledWith({ target: { value: 'Text' } });
  });
});

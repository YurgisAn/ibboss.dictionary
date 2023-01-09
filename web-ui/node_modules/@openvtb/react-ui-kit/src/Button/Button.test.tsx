import React from 'react';
import { shallow } from 'enzyme';

import { Button } from '../Button';

jest.mock('../common', () => ({
  DEFAULT_THEME: {},
}));

describe('Button', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const Icon = () => <div />;

  it('should render component', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with text', () => {
    const wrapper = shallow(<Button>Text</Button>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with icon', () => {
    const wrapper = shallow(
      <Button>
        <Icon />
      </Button>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with text and left icon', () => {
    const wrapper = shallow(
      <Button>
        <Icon /> Text
      </Button>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with text and right icon', () => {
    const wrapper = shallow(
      <Button>
        Text <Icon />
      </Button>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onClick when user clicks on component', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Button onClick={onClick} />);
    wrapper.simulate('click');
    expect(onClick).toBeCalledTimes(1);
  });
});

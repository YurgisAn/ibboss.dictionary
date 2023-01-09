import React from 'react';
import { shallow, mount } from 'enzyme';

import { Avatar } from '../Avatar';
import { ReactComponent as PersonOutlineIcon } from '../Icons/system/PersonOutlineIcon.svg';
import { ReactComponent as AddpersonOutlineIcon } from '../Icons/system/AddpersonOutlineIcon.svg';

jest.mock('../common', () => ({
  DEFAULT_THEME: {
    color: {
      neutral: {
        white: '',
      },
    },
  },
}));

describe('Avatar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const validSrc = 'https://duckduckgo.com/assets/common/dax-logo.svg';
  const invalidSrc = 'https://duckdusets/common/dax-logo.svg';
  const alt = 'Big Duck';
  const text = 'ABCD';

  it('should render component with default kind, size and icon', () => {
    const wrapper = shallow(<Avatar />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.childAt(0).is(PersonOutlineIcon));
  });

  it('should render component with text no more than two characters long', () => {
    const wrapper = shallow(<Avatar>{text}</Avatar>);
    expect(wrapper.childAt(0).render().text()).toBe('AB');
  });

  it('should render component with kind Blue and size 32', () => {
    const wrapper = shallow(<Avatar kind="blue" size={32} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with IMAGE', () => {
    const wrapper = mount(<Avatar src={validSrc} alt={alt} />);
    setTimeout(() => {
      expect(wrapper.find('img').prop('src')).toEqual(validSrc);
    }, 10000);
  });

  it('should render component with initials taken from alt attribute if image could not be loaded ', () => {
    const wrapper = shallow(<Avatar src={invalidSrc} alt={alt} />);
    expect(wrapper.childAt(0).render().text()).toBe('BD');
  });

  it('should render component with icon', () => {
    const wrapper = shallow(
      <Avatar>
        <AddpersonOutlineIcon />
      </Avatar>
    );
    expect(wrapper.childAt(0).is(AddpersonOutlineIcon));
  });
});

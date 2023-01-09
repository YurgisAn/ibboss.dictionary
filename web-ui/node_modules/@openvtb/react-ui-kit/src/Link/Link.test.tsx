import React from 'react';
import { shallow } from 'enzyme';

import { ReactComponent as ArrowLeftOutline } from '../Icons/system/ArrowLeftOutline.svg';
import { Link } from '../Link';

const linkText = 'Link Text';

jest.mock('../common', () => ({
  DEFAULT_THEME: {},
}));

describe('Link', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render component by default as "PRIMARY" link', () => {
    const wrapper = shallow(<Link href="#0">{linkText}</Link>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with kind="SECONDARY" link', () => {
    const wrapper = shallow(
      <Link href="#0" kind={'secondary'}>
        {linkText}
      </Link>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with size="SMALL" link', () => {
    const wrapper = shallow(
      <Link href="#0" size={'small'}>
        {linkText}
      </Link>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with kind="PRIMARY" link disabled', () => {
    const wrapper = shallow(
      <Link href="#0" kind={'primary'} disabled>
        {linkText}
      </Link>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component by default link with icon without icon position, icon position RIGHT by default', () => {
    const wrapper = shallow(
      <Link href="#0" icon={ArrowLeftOutline}>
        {linkText}
      </Link>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component by default link with icon and icon position LEFT', () => {
    const wrapper = shallow(
      <Link href="#0" icon={ArrowLeftOutline} iconPosition={'left'}>
        {linkText}
      </Link>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component by default link with icon and icon position RIGHT', () => {
    const wrapper = shallow(
      <Link href="#0" icon={ArrowLeftOutline} iconPosition={'right'}>
        {linkText}
      </Link>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component by default as "PRIMARY" link with inverse option', () => {
    const wrapper = shallow(
      <Link href="#0" inverse>
        {linkText}
      </Link>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

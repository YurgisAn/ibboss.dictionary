import React from 'react';
import { shallow } from 'enzyme';

import { runCommonTests } from '../common/Notification/test';
import { StaticNotification } from '../StaticNotification';

const message = 'StaticNotification Message';

jest.mock('../common', () => ({
  DEFAULT_THEME: {},
}));

describe('StaticNotification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  runCommonTests(StaticNotification, 'StaticNotification');

  it('should render component by default as "INFO" notification with white background', () => {
    const wrapper = shallow(<StaticNotification showWhiteBackground>{message}</StaticNotification>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with kind="ERROR" notification with white background', () => {
    const wrapper = shallow(
      <StaticNotification kind={'error'} showWhiteBackground>
        {message}
      </StaticNotification>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

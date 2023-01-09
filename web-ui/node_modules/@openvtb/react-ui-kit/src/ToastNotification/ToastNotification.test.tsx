import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import { runCommonTests, runCommonDynamicTests } from '../common/Notification/test';
import { ToastNotification } from '../ToastNotification';

const message = 'ToastNotification Message';

jest.mock('../common/default-theme', () => ({
  DEFAULT_THEME: {},
}));

describe('ToastNotification', () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((elementTransition) => {
      return elementTransition && elementTransition.props && elementTransition.props.children();
    }) as any;
  });

  afterEach(() => {
    (ReactDOM.createPortal as any).mockClear();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  runCommonTests(ToastNotification, 'ToastNotification');
  runCommonDynamicTests(ToastNotification, 'ToastNotification');

  it('should render component by default as "INFO" notification with link', () => {
    const wrapper = shallow(
      <ToastNotification link={{ href: '#0', text: 'Link Text' }}>{message}</ToastNotification>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

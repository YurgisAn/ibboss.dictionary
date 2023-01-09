import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import { runCommonTests, runCommonDynamicTests } from '../common/Notification/test';
import { LineNotification } from '../LineNotification';

const message = 'LineNotification Message';

jest.mock('../common/default-theme', () => ({
  DEFAULT_THEME: {},
}));

describe('LineNotification', () => {
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

  runCommonTests(LineNotification, 'LineNotification');
  runCommonDynamicTests(LineNotification, 'LineNotification');

  it('should render component by default as "INFO" notification with dark background', () => {
    const wrapper = shallow(<LineNotification showDarkBackground>{message}</LineNotification>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with kind="ERROR" notification with dark background', () => {
    const wrapper = shallow(
      <LineNotification kind={'error'} showDarkBackground>
        {message}
      </LineNotification>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

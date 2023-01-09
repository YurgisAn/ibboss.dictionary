import React, { FC } from 'react';
import { shallow } from 'enzyme';

import type { INotificationProps } from './NotificationComponent';
import type { IDynamicNotificationProps } from './DynamicNotification';

export const runCommonTests = (Notification: FC<INotificationProps>, caption: string) => {
  const header = caption + ' Header';
  const message = caption + ' Message';
  return [
    it('should render component by default as "INFO" notification without header', () => {
      const wrapper = shallow(<Notification>{message}</Notification>);
      expect(wrapper).toMatchSnapshot();
    }),

    it('should render component by default as "INFO" notification with header', () => {
      const wrapper = shallow(<Notification header={header}>{message}</Notification>);
      expect(wrapper).toMatchSnapshot();
    }),

    it('should render component with kind="INFO" notification without header', () => {
      const wrapper = shallow(<Notification kind={'info'}>{message}</Notification>);
      expect(wrapper).toMatchSnapshot();
    }),

    it('should render component with kind="INFO" notification with header', () => {
      const wrapper = shallow(
        <Notification kind={'info'} header={header}>
          {message}
        </Notification>
      );
      expect(wrapper).toMatchSnapshot();
    }),

    it('should render component with kind="WARNING" notification without header', () => {
      const wrapper = shallow(<Notification kind={'warning'}>{message}</Notification>);
      expect(wrapper).toMatchSnapshot();
    }),

    it('should render component with kind="WARNING" notification with header', () => {
      const wrapper = shallow(
        <Notification kind={'warning'} header={header}>
          {message}
        </Notification>
      );
      expect(wrapper).toMatchSnapshot();
    }),

    it('should render component with kind="SUCCESS" notification without header', () => {
      const wrapper = shallow(<Notification kind={'success'}>{message}</Notification>);
      expect(wrapper).toMatchSnapshot();
    }),

    it('should render component with kind="SUCCESS" notification with header', () => {
      const wrapper = shallow(
        <Notification kind={'success'} header={header}>
          {message}
        </Notification>
      );
      expect(wrapper).toMatchSnapshot();
    }),

    it('should render component with kind="ERROR" notification without header', () => {
      const wrapper = shallow(<Notification kind={'error'}>{message}</Notification>);
      expect(wrapper).toMatchSnapshot();
    }),

    it('should render component with kind="ERROR" notification with header', () => {
      const wrapper = shallow(
        <Notification kind={'error'} header={header}>
          {message}
        </Notification>
      );
      expect(wrapper).toMatchSnapshot();
    }),

    it('should render component by default as "INFO" notification without header with custom width', () => {
      const wrapper = shallow(<Notification width={777}>{message}</Notification>);
      expect(wrapper).toMatchSnapshot();
    }),
  ];
};

export const runCommonDynamicTests = (
  Notification: FC<IDynamicNotificationProps>,
  caption: string
) => {
  const message = caption + ' Message';
  return [
    it('should render component inside the document.body container', () => {
      const wrapper = shallow(<Notification container={document.body}>{message}</Notification>);
      expect(wrapper).toMatchSnapshot();
    }),
  ];
};

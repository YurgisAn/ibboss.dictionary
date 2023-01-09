import styled from 'styled-components';

import { DEFAULT_THEME } from '../common';
import { NotificationComponent } from '../common/Notification/NotificationComponent';
import type { INotificationComponentProps } from '../common/Notification/NotificationComponent';

interface IStaticNotificationComponentProps extends INotificationComponentProps {
  showWhiteBackground?: boolean;
}

export const StaticNotificationComponent = styled(
  NotificationComponent
)<IStaticNotificationComponentProps>`
  ${({ theme, showWhiteBackground }) => `
     ${showWhiteBackground ? `background-color: ${theme.color.neutral.white}` : ''};
  `}
`;

StaticNotificationComponent.defaultProps = {
  theme: DEFAULT_THEME,
};

import React, { useState, useEffect, FC } from 'react';
import { Transition } from 'react-transition-group';
import ReactDOM from 'react-dom';

import { ReactComponent as CloseOutline } from '../../Icons/service/CloseOutline.svg';
import { useGesture } from '../hooks';
import { useMobile } from '../hooks/useMobile';

import type { INotificationProps } from './NotificationComponent';
import { NOTIFICATION_ICONS } from './NotificationComponent';
import { DynamicNotificationComponent } from './DynamicNotificationComponent';
import { Icon } from './Icon';
import { IconClose } from './IconClose';
import { DEFAULT_DURATION } from './constants';
import { getTransitionStyles } from './utils';

export type VisibilityHandler = () => void;

export interface IDynamicNotificationProps extends INotificationProps {
  /** Время отображения анимации открытия/закрытия */
  duration?: number;
  /** Время отображения оповещения до автоматического закрытия */
  delay?: number;
  /** Контейнер, в котором происходит размещение оповещения */
  container?: Element;
  /** Коллбэк начала анимации отображения оповещения */
  onShow?: VisibilityHandler;
  /** Коллбэк окончания анимации скрытия оповещения */
  onHide?: VisibilityHandler;
}

const DEFAULT_WIDTH = '100%';

interface IDynamicNotification extends IDynamicNotificationProps {
  inverse?: boolean;
  top?: number;
  left?: number;
  right?: number;
}

export const DynamicNotification: FC<IDynamicNotification> = ({
  children,
  kind = 'info',
  width = DEFAULT_WIDTH,
  duration = DEFAULT_DURATION,
  delay,
  container,
  header,
  inverse,
  top,
  left,
  right,
  className,
  dataTestId,
  onShow,
  onHide,
  ...props
}) => {
  const KindIcon = NOTIFICATION_ICONS[kind];
  const mobile = useMobile();
  const [gesture, gestureBinding] = useGesture();
  const [visible, setVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    (gesture === 'left' || gesture === 'right') && setVisible(false);
  }, [gesture, setVisible]);

  const applyTimer = () => {
    if (delay) {
      const timer = setTimeout(() => {
        setVisible(false);
        clearTimeout(timer);
      }, delay);
    }
  };

  const transitionStyles = getTransitionStyles(duration);
  const component = (
    <Transition
      in={isMounted && visible}
      timeout={duration}
      onEntered={() => applyTimer()}
      onEnter={() => onShow && onShow()}
      onExited={() => onHide && onHide()}
    >
      {(state) => (
        <DynamicNotificationComponent
          {...gestureBinding}
          {...props}
          mobile={mobile}
          style={{ ...transitionStyles[state] }}
          className={className}
          data-test-id={dataTestId}
          kind={kind}
          width={width}
          inverse={inverse}
          top={top}
          left={left}
          right={right}
        >
          <Icon>
            <KindIcon />
          </Icon>
          <IconClose onClick={() => setVisible(false)} inverse={inverse} markerOffset={6}>
            <CloseOutline width={20} height={20} />
          </IconClose>
          {children}
        </DynamicNotificationComponent>
      )}
    </Transition>
  );
  return container ? ReactDOM.createPortal(component, container) : component;
};

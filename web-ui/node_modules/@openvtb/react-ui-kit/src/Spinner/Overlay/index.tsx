import React from 'react';
import type { FC, MouseEvent } from 'react';

import { OverlayComponent } from './OverlayComponent';

export interface IOverlayProps {
  /** Флаг инверсии цвета фона */
  inverse?: boolean;
  /** Флаг отображения */
  show: boolean;
  /** Флаг удаления фона */
  transparent?: boolean;
  /** Обработчик клика */
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export const Overlay: FC<IOverlayProps> = ({ children, inverse, show, transparent, onClick }) =>
  show ? (
    <OverlayComponent inverse={inverse} transparent={transparent} onClick={onClick}>
      {children}
    </OverlayComponent>
  ) : null;

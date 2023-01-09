import React from 'react';
import type { FC } from 'react';

import { ReactComponent as SpinnerBlueBig } from './svg/SpinnerBlueBig.svg';
import { ReactComponent as SpinnerBlueMedium } from './svg/SpinnerBlueMedium.svg';
import { ReactComponent as SpinnerBlueSmall } from './svg/SpinnerBlueSmall.svg';
import { ReactComponent as SpinnerWhiteBig } from './svg/SpinnerWhiteBig.svg';
import { ReactComponent as SpinnerWhiteMedium } from './svg/SpinnerWhiteMedium.svg';
import { ReactComponent as SpinnerWhiteSmall } from './svg/SpinnerWhiteSmall.svg';
import { SpinnerIconWrapper } from './SpinnerIconWrapper';
import type { Size } from './SpinnerIconWrapper';

const SPINNER_ICON = {
  blue: {
    big: SpinnerBlueBig,
    medium: SpinnerBlueMedium,
    small: SpinnerBlueSmall,
  },
  white: {
    big: SpinnerWhiteBig,
    medium: SpinnerWhiteMedium,
    small: SpinnerWhiteSmall,
  },
};

export * from './Overlay';

export interface ISpinnerProps {
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Белый цвет компонента */
  inverse?: boolean;
  /** Размер компонента */
  size?: Size;
}

export const Spinner: FC<ISpinnerProps> = ({ className, dataTestId, inverse, size = 'big' }) => {
  const color = inverse ? 'white' : 'blue';
  const SpinnerIcon = SPINNER_ICON[color][size];

  return (
    <SpinnerIconWrapper className={className} data-test-id={dataTestId} size={size}>
      <SpinnerIcon />
    </SpinnerIconWrapper>
  );
};

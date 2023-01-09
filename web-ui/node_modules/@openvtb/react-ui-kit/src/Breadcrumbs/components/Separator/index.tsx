import React, { FC } from 'react';

import { ReactComponent as ChevronRightOutline } from '../../../Icons/system/ChevronRightOutline.svg';

import { SeparatorComponent } from './SeparatorComponent';

const SIZE = 20;
const SIZE_SMALL = 16;

interface ISeparatorProps {
  small?: boolean;
}

export const Separator: FC<ISeparatorProps> = ({ small }) => {
  const size = small ? SIZE_SMALL : SIZE;
  return (
    <SeparatorComponent>
      <ChevronRightOutline height={size} width={size} />
    </SeparatorComponent>
  );
};

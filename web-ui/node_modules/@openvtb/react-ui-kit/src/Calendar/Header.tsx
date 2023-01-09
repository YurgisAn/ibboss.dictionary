import React, { FC } from 'react';

import { H3, H5, Body2Short, Caption1 } from '../Typography';

import { HeaderComponent } from './HeaderComponent';
import { Separator } from './Separator';
import { CalendarSize, LocaleType } from './constants';
import { getFormattedValue } from './date-utils';
import { capitalizeFirstLetter } from './utils';

interface IHeaderProps {
  size: CalendarSize;
  localeName: LocaleType;
}

export const Header: FC<IHeaderProps> = ({ size, localeName }) => {
  const SubHeader = size === 'big' ? H3 : H5;
  const Caption = size === 'big' ? Body2Short : Caption1;
  const currentDate = new Date();
  return (
    <HeaderComponent size={size}>
      <SubHeader>{getFormattedValue(currentDate, 'd\u00A0MMMM', localeName)}</SubHeader>
      <Separator height={2} />
      <Caption>{capitalizeFirstLetter(getFormattedValue(currentDate, 'cccc', localeName))}</Caption>
    </HeaderComponent>
  );
};

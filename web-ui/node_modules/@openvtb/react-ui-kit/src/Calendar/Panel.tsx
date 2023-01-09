import React, { FC, MouseEvent } from 'react';

import { ReactComponent as ChevronLeftOutline } from '../Icons/system/ChevronLeftOutline.svg';
import { ReactComponent as ChevronRightOutline } from '../Icons/system/ChevronRightOutline.svg';
import { ReactComponent as ChevronUpOutline } from '../Icons/system/ChevronUpOutline.svg';
import { ReactComponent as ChevronDownOutline } from '../Icons/system/ChevronDownOutline.svg';
import { createTooltipHOC } from '../TooltipHOC';
import { Subtitle2, Subtitle3 } from '../Typography';

import {
  CalendarSize,
  LocaleType,
  MENU_DAY,
  MENU_YEAR,
  MENU_NEXT_YEAR,
  MENU_PREVIOUS_YEAR,
  MENU_NEXT_MONTH,
  MENU_PREVIOUS_MONTH,
} from './constants';
import {
  addYears,
  subYears,
  addMonths,
  subMonths,
  differenceMonths,
  differenceYears,
  getFormattedValue,
} from './date-utils';
import { PanelComponent } from './PanelComponent';
import {
  NavigationPanel,
  NavigationPrevious,
  NavigationNext,
  NavigationYearDown,
  NavigationYearUp,
} from './Navigation';
import { getIconSize, capitalizeFirstLetter } from './utils';

interface IPanelProps {
  onChangeView(event: MouseEvent<HTMLDivElement>): void;
  onNext(event: MouseEvent<HTMLDivElement>): void;
  onPrevious(event: MouseEvent<HTMLDivElement>): void;
  viewDate: Date;
  yearView: boolean;
  size: CalendarSize;
  localeName: LocaleType;
  minDate?: Date;
  maxDate?: Date;
  tooltipContainer?: Element | null;
}

export const Panel: FC<IPanelProps> = ({
  size,
  viewDate,
  minDate,
  maxDate,
  yearView,
  localeName,
  tooltipContainer,
  onChangeView,
  onNext,
  onPrevious,
}) => {
  const previousMonthDisabled = !!minDate && differenceMonths(minDate, subMonths(viewDate, 1)) > 0;
  const nextMonthDisabled = !!maxDate && differenceMonths(addMonths(viewDate, 1), maxDate) > 0;
  const previousYearDisabled = !!minDate && differenceYears(minDate, subYears(viewDate, 1)) > 0;
  const nextYearDisabled = !!maxDate && differenceYears(addYears(viewDate, 1), maxDate) > 0;
  const previousDisabled = yearView ? previousYearDisabled : previousMonthDisabled;
  const nextDisabled = yearView ? nextYearDisabled : nextMonthDisabled;

  const Title = size === 'big' ? Subtitle2 : Subtitle3;
  const NavigationYear = yearView ? NavigationYearUp : NavigationYearDown;
  const NavigationYearIcon = yearView ? ChevronUpOutline : ChevronDownOutline;
  const NavigationYearWithTooltip = createTooltipHOC(NavigationYear);
  const NavigationPreviousWithTooltip = createTooltipHOC(NavigationPrevious);
  const NavigationNextWithTooltip = createTooltipHOC(NavigationNext);
  const iconSize = getIconSize(size);

  return (
    <PanelComponent size={size} yearView={yearView}>
      <Title>
        {capitalizeFirstLetter(getFormattedValue(viewDate, 'LLLL', localeName))}&nbsp;
        {getFormattedValue(viewDate, 'uuuu', localeName)}
        <NavigationYearWithTooltip
          tooltip={yearView ? MENU_DAY : MENU_YEAR}
          container={tooltipContainer}
          onMouseDown={(event) => {
            event.preventDefault();
            onChangeView(event);
          }}
        >
          <NavigationYearIcon width={iconSize} height={iconSize} />
        </NavigationYearWithTooltip>
      </Title>
      <NavigationPanel>
        <NavigationPreviousWithTooltip
          tooltip={yearView ? MENU_PREVIOUS_YEAR : MENU_PREVIOUS_MONTH}
          container={tooltipContainer}
          onMouseDown={(event) => {
            event?.preventDefault();
            onPrevious(event);
          }}
          disabled={previousDisabled}
        >
          <ChevronLeftOutline width={iconSize} height={iconSize} />
        </NavigationPreviousWithTooltip>
        <NavigationNextWithTooltip
          tooltip={yearView ? MENU_NEXT_YEAR : MENU_NEXT_MONTH}
          container={tooltipContainer}
          onMouseDown={(event) => {
            event?.preventDefault();
            onNext(event);
          }}
          disabled={nextDisabled}
        >
          <ChevronRightOutline width={iconSize} height={iconSize} />
        </NavigationNextWithTooltip>
      </NavigationPanel>
    </PanelComponent>
  );
};

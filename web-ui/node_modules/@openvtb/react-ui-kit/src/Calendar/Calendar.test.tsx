import React from 'react';
import { mount } from 'enzyme';

import { Calendar } from '../Calendar';

import {
  NavigationYearDown,
  NavigationYearUp,
  NavigationNext,
  NavigationPrevious,
} from './Navigation';
import { LocaleType } from './constants';
import { getFormattedValue } from './date-utils';
import { capitalizeFirstLetter } from './utils';
import { YearComponent } from './YearComponent';
import { DayComponent } from './DayComponent';

jest.mock('../TooltipHOC', () => ({
  // eslint-disable-next-line react/display-name
  createTooltipHOC: (args: any) => args,
}));

jest.mock('../common', () => ({
  DEFAULT_THEME: {
    borderRadius: '',
    boxShadow: {},
    color: {
      neutral: {},
      primary: {},
      opacity: {},
    },
  },
}));

const YEAR_CLASS = YearComponent;
const DAY_CLASS = DayComponent;

const currentDate = new Date();
const testedDate = new Date(2020, 7, 1);

const formatValue = (pattern: string, localeName?: LocaleType) =>
  getFormattedValue(currentDate, pattern, localeName || 'ru');

const emptyCallback = () => {
  /* do nothing */
};

const currentDateString = formatValue('d\u00A0MMMM') + capitalizeFirstLetter(formatValue('cccc'));

describe('Calendar', () => {
  it('should render simple', () => {
    const wrapper = mount(<Calendar selected={testedDate} simple onChange={emptyCallback} />);

    expect(wrapper.text()).toBe(
      'Август\u00A02020пнвтсрчтптсбвс272829303112345678910111213141516171819202122232425262728293031123456'
    );
  });

  it('should render with "enUS" locale', () => {
    const currentDateString_enUS =
      formatValue('d\u00A0MMMM', 'enUS') + capitalizeFirstLetter(formatValue('cccc', 'enUS'));
    const wrapper = mount(
      <Calendar selected={testedDate} localeName="enUS" onChange={emptyCallback} />
    );

    expect(wrapper.text()).toBe(
      `${currentDateString_enUS}August\u00A02020SuMoTuWeThFrSa2627282930311234567891011121314151617181920212223242526272829303112345`
    );
  });

  it('should render with "de" locale', () => {
    const currentDateString_de =
      formatValue('d\u00A0MMMM', 'de') + capitalizeFirstLetter(formatValue('cccc', 'de'));
    const wrapper = mount(
      <Calendar selected={testedDate} localeName="de" onChange={emptyCallback} />
    );

    expect(wrapper.text()).toBe(
      `${currentDateString_de}August\u00A02020MoDiMiDoFrSaSo272829303112345678910111213141516171819202122232425262728293031123456`
    );
  });

  it('should disable Day-dates and panel previous/next buttons before minDate and after maxDate', () => {
    const wrapper = mount(
      <Calendar
        selected={new Date(2020, 7, 15)}
        minDate={new Date(2020, 7, 12)}
        maxDate={new Date(2020, 8, 17)}
        onChange={emptyCallback}
      />
    );
    let dayElements = wrapper.find(DAY_CLASS);
    let dayElement = dayElements.at(15);
    expect(dayElement.text()).toBe('11');
    expect(dayElement.prop('disabled')).toBeTruthy();
    dayElement = dayElements.at(16);
    expect(dayElement.text()).toBe('12');
    expect(dayElement.prop('disabled')).toBeFalsy();
    expect(wrapper.find(NavigationPrevious).prop('disabled')).toBeTruthy();
    expect(wrapper.find(NavigationNext).prop('disabled')).toBeFalsy();

    wrapper.find(NavigationNext).simulate('mouseDown');
    dayElements = wrapper.find(DAY_CLASS);
    dayElement = dayElements.at(18);
    expect(dayElement.text()).toBe('18');
    expect(dayElement.prop('disabled')).toBeTruthy();
    dayElement = dayElements.at(17);
    expect(dayElement.text()).toBe('17');
    expect(dayElement.prop('disabled')).toBeFalsy();
    expect(wrapper.find(NavigationPrevious).prop('disabled')).toBeFalsy();
    expect(wrapper.find(NavigationNext).prop('disabled')).toBeTruthy();
  });

  it('should disable Year-dates before minDate and after maxDate', () => {
    const wrapper = mount(
      <Calendar
        selected={new Date(2020, 7, 15)}
        minDate={new Date(2020, 7, 12)}
        maxDate={new Date(2020, 8, 17)}
        onChange={emptyCallback}
      />
    );
    wrapper.find(NavigationYearDown).simulate('mouseDown');
    const yearElements = wrapper.find(YEAR_CLASS);
    for (let i = 0; i < yearElements.length; ++i) {
      const yearElement = yearElements.at(i);
      expect(yearElement.prop('disabled')).toBe(yearElement.text() !== '2020');
    }
    expect(wrapper.find(NavigationPrevious).prop('disabled')).toBeTruthy();
    expect(wrapper.find(NavigationNext).prop('disabled')).toBeTruthy();
  });

  it('should change button from "Year Down" to "Year Up" when year mode button has been clicked firstly', () => {
    const wrapper = mount(<Calendar selected={testedDate} onChange={emptyCallback} />);
    expect(wrapper.find(NavigationYearUp).length).toBe(0);
    wrapper.find(NavigationYearDown).simulate('mouseDown');
    expect(wrapper.find(NavigationYearDown).length).toBe(0);
  });

  it('should change days to years content when year mode button has been clicked', () => {
    const wrapper = mount(<Calendar selected={testedDate} onChange={emptyCallback} />);

    expect(wrapper.text()).toBe(
      `${currentDateString}Август\u00A02020пнвтсрчтптсбвс272829303112345678910111213141516171819202122232425262728293031123456`
    );
    wrapper.find(NavigationYearDown).simulate('mouseDown');
    expect(wrapper.text()).toBe(
      `${currentDateString}Август\u00A020202017201820192020202120222023202420252026202720282029203020312032`
    );
  });

  it('should change to next month when "Next" button has been clicked', () => {
    const wrapper = mount(<Calendar selected={testedDate} onChange={emptyCallback} />);

    expect(wrapper.text()).toBe(
      `${currentDateString}Август\u00A02020пнвтсрчтптсбвс272829303112345678910111213141516171819202122232425262728293031123456`
    );
    wrapper.find(NavigationNext).simulate('mouseDown');
    expect(wrapper.text()).toBe(
      `${currentDateString}Сентябрь\u00A02020пнвтсрчтптсбвс311234567891011121314151617181920212223242526272829301234`
    );
  });

  it('should change to previous month when "Pevious" button has been clicked', () => {
    const wrapper = mount(<Calendar selected={testedDate} onChange={emptyCallback} />);

    expect(wrapper.text()).toBe(
      `${currentDateString}Август\u00A02020пнвтсрчтптсбвс272829303112345678910111213141516171819202122232425262728293031123456`
    );
    wrapper.find(NavigationPrevious).simulate('mouseDown');
    expect(wrapper.text()).toBe(
      `${currentDateString}Июль\u00A02020пнвтсрчтптсбвс29301234567891011121314151617181920212223242526272829303112`
    );
  });

  it('should change year only when "Next" button was clicked twice then year was chosen when date has been selected', () => {
    let onChangeCalled = false;
    const wrapper = mount(
      <Calendar selected={testedDate} onChange={() => (onChangeCalled = true)} />
    );
    expect(wrapper.text()).toBe(
      `${currentDateString}Август\u00A02020пнвтсрчтптсбвс272829303112345678910111213141516171819202122232425262728293031123456`
    );

    wrapper.find(NavigationNext).simulate('mouseDown');
    wrapper.find(NavigationNext).simulate('mouseDown');
    wrapper.find(NavigationYearDown).simulate('mouseDown');

    const yearElement = wrapper.find(YEAR_CLASS);
    expect(yearElement.length).toBe(4 * 4);

    yearElement.at(10).simulate('mouseDown');
    expect(wrapper.text()).toBe(
      `${currentDateString}Октябрь\u00A02027пнвтсрчтптсбвс2728293012345678910111213141516171819202122232425262728293031`
    );
    expect(onChangeCalled).toBeFalsy();
  });

  it('should change day when new day has been clicked', () => {
    let clickedDay: Date | Array<Date | null> | null = null;
    const wrapper = mount(
      <Calendar
        selected={testedDate}
        onChange={(date: Date | Array<Date | null>) => (clickedDay = date)}
      />
    );
    const dayElement = wrapper.find(DAY_CLASS);
    expect(dayElement.length).toBe(7 * 6);

    dayElement.at(20).simulate('mouseDown');
    expect(clickedDay).toEqual(new Date(2020, 7, 16));
  });

  it('should change day and save previous time values when new day has been clicked', () => {
    let selected: Date | Array<Date | null> | null = new Date(2020, 7, 1, 14, 57, 48, 999);
    const wrapper = mount(
      <Calendar
        selected={selected}
        onChange={(date: Date | Array<Date | null>) => (selected = date)}
      />
    );
    wrapper.find(DAY_CLASS).at(20).simulate('mouseDown');
    expect(selected).toEqual(new Date(2020, 7, 16, 14, 57, 48, 999));
  });

  it('should change days range when start day and end day have been clicked', () => {
    let dates: Array<Date | null> = [];
    const wrapper = mount(
      <Calendar
        selected={testedDate} // do not set 'range' here to go to testedDate page
        onChange={(date: Date | Array<Date | null>) => {
          dates = [date[0], date[1]];
          wrapper.setProps({
            // because of we pass props to internal component state in real case
            startDate: date[0],
            endDate: date[1],
          });
        }}
      />
    );
    wrapper.setProps({
      range: true,
    });
    wrapper.update();

    const dayElement = wrapper.find(DAY_CLASS);
    expect(dayElement.length).toBe(7 * 6);

    dayElement.at(20).simulate('mouseDown');
    expect(dates).toEqual([new Date(2020, 7, 16), null]);

    dayElement.at(25).simulate('mouseDown');
    expect(dates).toEqual([new Date(2020, 7, 16), new Date(2020, 7, 21)]);
  });
});

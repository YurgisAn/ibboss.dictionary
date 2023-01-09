import React, { Component } from 'react';

import { DEFAULT_SIZE, DEFAULT_LOCALE_NAME, DEFAULT_YEAR_COUNT } from './constants';
import { getDefaultDateValidator } from './Validator';
import { CalendarComponent } from './CalendarComponent';
import { DayNames } from './DayNames';
import { Month } from './Month';
import { Years } from './Years';
import { Header } from './Header';
import { Panel } from './Panel';
import {
  after,
  before,
  equal,
  changeTime,
  setMonth,
  setYear,
  addYears,
  subYears,
  addMonths,
  subMonths,
} from './date-utils';
import type { ICalendarProps, IDateSelectionProps } from './interfaces';

interface IState {
  viewDate: Date;
  activeDate: Date | null;
  yearView: boolean;
}

export type { ICalendarProps, IDateSelectionProps };

export class Calendar extends Component<ICalendarProps> {
  public static getDefaultValidator = getDefaultDateValidator;

  static defaultProps: Partial<ICalendarProps> = {
    size: DEFAULT_SIZE,
    localeName: DEFAULT_LOCALE_NAME,
  };

  state: IState;

  constructor(props) {
    super(props);

    this.state = {
      viewDate: this.getInitialViewDate(),
      activeDate: null,
      yearView: false,
    };
  }

  componentDidMount() {
    const { range, startDate } = this.props;
    if (range && startDate) {
      this.changeYear(startDate.getFullYear());
      this.changeMonth(startDate.getMonth());
    }
  }

  getValidator() {
    return this.props.validator || getDefaultDateValidator(this.props.minDate, this.props.maxDate);
  }

  getInitialViewDate = () => {
    const { selected, minDate, maxDate } = this.props;
    const current = new Date();
    if (selected) {
      return selected;
    } else {
      if (minDate && before(current, minDate)) {
        return minDate;
      } else if (maxDate && after(current, maxDate)) {
        return maxDate;
      }
    }
    return current;
  };

  changeView = () => {
    this.setState(({ yearView }: IState) => ({ yearView: !yearView }));
  };

  changeYear = (year) => {
    this.setState(({ viewDate }: IState) => ({ viewDate: setYear(viewDate, year) }));
  };

  increaseYear = () => {
    this.setState(({ viewDate, yearView }: IState) => ({
      viewDate: addYears(viewDate, yearView ? DEFAULT_YEAR_COUNT : 1),
    }));
  };

  decreaseYear = () => {
    this.setState(({ viewDate, yearView }: IState) => ({
      viewDate: subYears(viewDate, yearView ? DEFAULT_YEAR_COUNT : 1),
    }));
  };

  changeMonth = (month) => {
    this.setState(({ viewDate }: IState) => ({ viewDate: setMonth(viewDate, month) }));
  };

  increaseMonth = () => {
    this.setState(({ viewDate }: IState) => ({ viewDate: addMonths(viewDate, 1) }));
  };

  decreaseMonth = () => {
    this.setState(({ viewDate }: IState) => ({ viewDate: subMonths(viewDate, 1) }));
  };

  handleDayMouseEnter = (day: Date, _) => {
    this.setState({ activeDate: day });
  };

  handleMonthMouseLeave = () => {
    this.setState({ activeDate: null });
  };

  handleDayClick = (day: Date, event) => {
    const { onChange, range, startDate, endDate, selected } = this.props;
    let date = day;
    if (range || !equal(selected, date)) {
      date = changeTime(date, selected);
      if (range) {
        if (!startDate && !endDate) {
          onChange([date, null], event);
        } else if (startDate && !endDate) {
          if (before(date, startDate)) {
            onChange([date, null], event);
          } else {
            onChange([startDate, date], event);
          }
        } else if (!startDate && endDate) {
          if (before(date, endDate)) {
            onChange([date, endDate], event);
          } else {
            onChange([date, null], event);
          }
        }
        if (startDate && endDate) {
          onChange([date, null], event);
        }
      } else {
        onChange(date, event);
      }
    }
  };

  handleYearClick = (date: Date, _) => {
    // Selected date is not changed, only view has been changed
    this.changeYear(date.getFullYear());
    this.setState(() => ({ yearView: false }));
  };

  renderHeader = (): React.ReactNode => {
    const { size = DEFAULT_SIZE, localeName = DEFAULT_LOCALE_NAME } = this.props;
    return <Header size={size} localeName={localeName} />;
  };

  renderPanel = (): React.ReactNode => {
    const { size = DEFAULT_SIZE, localeName, minDate, maxDate, tooltipContainer } = this.props;
    const { viewDate, yearView } = this.state;
    return (
      <Panel
        size={size}
        viewDate={viewDate}
        minDate={minDate}
        maxDate={maxDate}
        yearView={yearView}
        localeName={localeName}
        onChangeView={this.changeView}
        onNext={yearView ? this.increaseYear : this.increaseMonth}
        onPrevious={yearView ? this.decreaseYear : this.decreaseMonth}
        tooltipContainer={tooltipContainer}
      />
    );
  };

  renderMonth = () => {
    const { size = DEFAULT_SIZE, localeName, startDate, endDate, selected, range } = this.props;
    const { viewDate, activeDate } = this.state;

    return (
      <>
        <DayNames size={size} date={viewDate} localeName={localeName} />
        <Month
          size={size}
          day={viewDate}
          startDate={startDate}
          endDate={endDate}
          selected={selected}
          activeDate={activeDate}
          range={range}
          localeName={localeName}
          validator={this.getValidator()}
          onMouseEnter={this.handleDayMouseEnter}
          onMouseLeave={this.handleMonthMouseLeave}
          onClick={this.handleDayClick}
        />
      </>
    );
  };

  renderYears = () => {
    const { size = DEFAULT_SIZE, localeName, startDate, endDate, selected, range } = this.props;
    const { viewDate } = this.state;
    return (
      <Years
        size={size}
        viewDate={viewDate}
        startDate={startDate}
        endDate={endDate}
        selected={selected}
        localeName={localeName}
        range={range}
        validator={this.getValidator()}
        onClick={this.handleYearClick}
      />
    );
  };

  render() {
    const { size = DEFAULT_SIZE, simple, className, dataTestId } = this.props;
    const { yearView } = this.state;
    return (
      <div className={className} data-test-id={dataTestId}>
        {!simple && this.renderHeader()}
        <CalendarComponent size={size} yearView={yearView} simple={simple}>
          {this.renderPanel()}
          {yearView ? this.renderYears() : this.renderMonth()}
        </CalendarComponent>
      </div>
    );
  }
}

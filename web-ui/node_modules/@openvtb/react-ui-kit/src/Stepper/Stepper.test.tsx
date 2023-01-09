import React from 'react';
import { shallow } from 'enzyme';

import * as ContextModule from '../common/theme-context';
import { IStepperStepItem, Stepper } from '../Stepper';

import { StepComponent } from './StepComponent';

jest.spyOn(ContextModule, 'useThemeContext').mockImplementation(() => ({
  color: {
    primary: {},
    neutral: {},
    error: {},
  },
}));

const stepsData: IStepperStepItem[] = [
  { label: 'Первый шаг', stepState: 'completed' },
  {
    label: 'Второй шаг',
    stepState: 'error',
  },
  { label: 'Третий шаг', stepState: 'next', disabled: true },
  { label: 'Четвёртый шаг', stepState: 'next' },
  { label: 'Пятый шаг', stepState: 'next' },
];

describe('Stepper', () => {
  it('should render component HORIZONTAL by default with maximun 4 steps', () => {
    const wrapper = shallow(<Stepper items={stepsData} />);
    const steps = wrapper.find(StepComponent);
    expect(steps.length).toBe(4);
  });

  it('should render component VERTICAL with all steps', () => {
    const wrapper = shallow(<Stepper direction={'vertical'} items={stepsData} />);
    const steps = wrapper.find(StepComponent);
    expect(steps.length).toBe(5);
  });
});

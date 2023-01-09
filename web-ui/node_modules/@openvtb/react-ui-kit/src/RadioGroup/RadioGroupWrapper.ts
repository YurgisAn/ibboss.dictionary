import styled from 'styled-components';

import { RadioButtonComponent } from '../RadioButton/RadioButtonComponent';

import {
  RadioGroupSize,
  RADIOGROUP_MARGIN_BOTTOM_BIG,
  RADIOGROUP_MARGIN_BOTTOM_SMALL,
} from './constants';

export interface IRadioGroupWrapperProps {
  size: RadioGroupSize;
}

export const RadioGroupWrapper = styled.div<IRadioGroupWrapperProps>`
  display: inline-flex;
  flex-direction: column;
  & ${RadioButtonComponent} {
    margin-bottom: ${({ size }) =>
      size === 'small' ? RADIOGROUP_MARGIN_BOTTOM_SMALL : RADIOGROUP_MARGIN_BOTTOM_BIG};
  }

  & ${RadioButtonComponent}:last-child {
    margin-bottom: 0;
  }
`;

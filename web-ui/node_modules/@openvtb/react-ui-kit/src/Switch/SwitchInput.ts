import styled from 'styled-components';

import { SwitchSlider } from './SwitchSlider';
import type { Size } from './SwitchSlider';

const CIRCLE_TRANSLATE_X_BIG = '16px';
const CIRCLE_TRANSLATE_X_SMALL = '12px';

interface ISwitchInputProps {
  $size: Size;
}

export const SwitchInput = styled.input<ISwitchInputProps>`
  display: none;
  &:checked + ${SwitchSlider} {
    &:before,
    &:after {
      transform: ${({ $size }) =>
        $size === 'small'
          ? `translateX(${CIRCLE_TRANSLATE_X_SMALL});`
          : `translateX(${CIRCLE_TRANSLATE_X_BIG});`};
    }
  }
`;

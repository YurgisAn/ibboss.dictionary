import React, { useState, useRef, useEffect, FC } from 'react';

import { ReactComponent as ErrorSolid } from '../Icons/service/ErrorSolid.svg';
import { ReactComponent as CheckSolid } from '../Icons/service/CheckSolid.svg';
import { Body2Short } from '../Typography';
import { createTooltipHOC } from '../TooltipHOC';
import { useThemeContext } from '../common';

import {
  STEP_HEIGHT,
  MIN_HORZ_STEPS_NUMBER,
  MAX_SYMBOLS_NUMBER,
  ICON_SIZE,
  ELLIPSIS,
} from './constants';
import { StepperComponent } from './StepperComponent';
import { StepComponent, StepState, Direction } from './StepComponent';
import { Caption } from './Caption';
import { getColors } from './utils';

export interface IStepperStepItem {
  /** Состояние шага */
  stepState: StepState;
  /** Подпись к  шагу */
  label: string;
  /** Отключение шага */
  disabled?: boolean;
}

export interface IStepperProps {
  /** Массив шагов */
  items: IStepperStepItem[];
  /** Ориентация (горизонтальный/вертикальный) */
  direction?: Direction;
  /** Ширина */
  width?: string | number;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Контейнер, в котором при необходимости можно отрисовать тултип через ReactDOM.createPortal */
  tooltipContainer?: Element | null;
}

const STEP_ICONS = {
  completed: CheckSolid,
  error: ErrorSolid,
};

const TextWithTooltip = createTooltipHOC(Body2Short);
const getLabel = (label: string, tooltip?: boolean) =>
  tooltip ? label.trim().substring(0, MAX_SYMBOLS_NUMBER) + ELLIPSIS : label;

export const Stepper: FC<IStepperProps> = (props) => {
  const { direction = 'horizontal', width, className, dataTestId, tooltipContainer } = props;
  const theme = useThemeContext();
  const ref = useRef<HTMLDivElement | null>(null);
  const textRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [tooltipItems, setTooltipItems] = useState([false]);
  useEffect(() => {
    setTooltipItems(textRefs.current.map((ref) => !!ref && ref.scrollHeight > 2 * STEP_HEIGHT));
  }, [textRefs, setTooltipItems]);

  const items =
    direction === 'horizontal' ? props.items.slice(0, MIN_HORZ_STEPS_NUMBER) : props.items;

  return (
    <StepperComponent
      ref={ref}
      width={width}
      direction={direction}
      className={className}
      data-test-id={dataTestId}
    >
      {items.map((item, index) => {
        const StepIcon = STEP_ICONS[item.stepState];
        const Text = tooltipItems[index] ? TextWithTooltip : Body2Short;
        return (
          <StepComponent
            ref={(element: HTMLDivElement) => {
              if (element && ref.current && item.stepState === 'current') {
                ref.current.scrollTo({
                  left: element.offsetLeft,
                  behavior: 'smooth',
                });
              }
            }}
            key={item.label + index}
            direction={direction}
            stepState={item.stepState}
            colors={getColors(theme, item.stepState, item.disabled)}
          >
            {StepIcon ? (
              <StepIcon width={ICON_SIZE} height={ICON_SIZE} />
            ) : (
              <Caption>{index + 1}</Caption>
            )}
            <Text
              ref={(el: HTMLDivElement) => (textRefs.current[index] = el)}
              tooltip={item.label}
              container={tooltipContainer}
            >
              {getLabel(item.label, tooltipItems[index])}
            </Text>
          </StepComponent>
        );
      })}
    </StepperComponent>
  );
};

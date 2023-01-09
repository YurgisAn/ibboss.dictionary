import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  useCallback,
  FocusEvent,
  memo,
  MutableRefObject,
} from 'react';

import { Input } from '../Inputs/BaseField';
import { Body2Short } from '../Typography';
import { formatValueWithSeparator } from '../Inputs/common';

import { DEFAULT_WIDTH, MIN_VALUE, MAX_VALUE, DEFAULT_STEP } from './constants';
import { correctValueWithRanges } from './utils';
import {
  RangeSlider,
  Track,
  RangeTrack,
  RangeTrackFilled,
  TrackWrapper,
  SliderCircle,
  ValueStart,
  RangeWrapper,
  ValueEnd,
} from './StyledComponents';
import { RangePoints } from './RangePoints';

export interface IRangesProps {
  /** Значение range */
  value: number;
}

export interface IRangeProps {
  /** Уникальный идентификатор */
  id?: string;
  /** Коллбек на изменение состояния */
  onChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  /** Значение range */
  value: string;
  /** Коллбек на изменение блюр */
  onBlur?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  /** Массив значений range */
  ranges?: IRangesProps[];
  /** Отключение range */
  disabled?: boolean;
  /** Минимальное значение */
  minValue?: number;
  /** Максимальное значение */
  maxValue?: number;
  /** Ограничение количества символов в поле ввода */
  maxLength?: number;
  /** Шаг слайдера */
  step?: number;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** В инпуте или нет */
  inInput?: boolean;
  /** Длина Range */
  width?: string | number;
}

export const Range = memo(
  ({
    minValue = MIN_VALUE,
    maxValue = MAX_VALUE,
    value = '',
    id,
    onChange,
    ranges,
    disabled,
    className,
    dataTestId,
    onBlur,
    step = DEFAULT_STEP,
    inInput = false,
    width = DEFAULT_WIDTH,
    ...props
  }: IRangeProps) => {
    const [isTouch, setTouch] = useState(false);
    const [valueRange, setValueRange] = useState<string>(value);
    const [animation, setAnimation] = useState(false);

    const filledRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const trackRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const sliderRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

    useEffect(() => {
      correctSliderPosition(valueRange);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (isTouch && !disabled) {
        document.addEventListener('mousemove', updateSlider);
        document.addEventListener('mouseup', handleSliderMouseUp);
      }
      return () => {
        document.removeEventListener('mousemove', updateSlider);
        document.removeEventListener('mouseup', handleSliderMouseUp);
      };
    });

    const slideValue = useCallback(
      (lineWidth: number, sliderPosition: number, e: any) => {
        const onePartVal = lineWidth ? (maxValue - minValue) / lineWidth : 0;

        let sliderValue = sliderPosition * onePartVal;

        if (!step || step >= 1) {
          sliderValue = Math.round(sliderValue);
        }
        let calcValue = minValue + sliderValue;

        if (step) {
          calcValue = Math.round(calcValue / step) * step;
        }

        setValueRange(String(calcValue));

        onChange && onChange(e, String(calcValue));
      },
      [maxValue, minValue, onChange, step]
    );

    const updateSlider = useCallback(
      (e: any) => {
        if (e.type === 'mousedown') {
          setAnimation(true);
        } else {
          setAnimation(false);
          const slider = sliderRef.current;
          const rangeWidth = trackRef.current ? trackRef.current.offsetWidth : 0;
          const rangeLeft = trackRef.current ? trackRef.current.getBoundingClientRect().left : 0;
          const sliderPosition =
            rangeLeft && slider
              ? Math.round(slider.getBoundingClientRect().left - rangeLeft + 7)
              : 0;

          if (isTouch && rangeLeft) {
            let cursorPosition = e.pageX;
            if (cursorPosition <= rangeLeft) {
              cursorPosition = rangeLeft;
            }

            if (cursorPosition >= rangeLeft + rangeWidth) {
              cursorPosition = rangeLeft + rangeWidth;
            }

            const getStyleWidth = (cursorPosition: number, rangeLeft: number, rangeWidth: number) =>
              `${((cursorPosition - rangeLeft) / rangeWidth) * 100}%`;
            if (slider && filledRef.current) {
              slider.style.left = getStyleWidth(cursorPosition, rangeLeft, rangeWidth);
              filledRef.current.style.width = getStyleWidth(cursorPosition, rangeLeft, rangeWidth);
            }
          }
          slideValue(rangeWidth, sliderPosition, e);
        }
      },
      [slideValue, isTouch]
    );

    const correctSliderPosition = useCallback(
      (value: string) => {
        const lineWidth = trackRef.current ? trackRef.current.clientWidth : 0;

        const onePartPx = lineWidth ? lineWidth / (maxValue - minValue) : 0;
        const numValue = parseFloat(value);
        const correctValue = numValue >= 0 ? numValue - minValue : -minValue - -numValue;
        let calcPercents: number = ((onePartPx * correctValue) / lineWidth) * 100;
        calcPercents = calcPercents > 100 ? 100 : calcPercents;
        calcPercents = calcPercents < 0 ? 0 : calcPercents;

        const sliderCoords = value ? calcPercents : 0;
        if (sliderRef.current && filledRef.current) {
          sliderRef.current.style.left = `${sliderCoords}%`;
          filledRef.current.style.width = `${sliderCoords}%`;
        }

        return setValueRange(String(value));
      },
      [maxValue, minValue]
    );

    const handleOnChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>, value: string) => {
        if (+value[0] === 0) {
          correctSliderPosition('');
          setAnimation(true);
          onChange && onChange(e, '');
        } else {
          correctSliderPosition(value);
          setAnimation(true);
          onChange && onChange(e, value);
        }
      },
      [correctSliderPosition, onChange]
    );

    const handleSliderMouseDown = useCallback(
      (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setTouch(true);
        updateSlider(e);
      },
      [updateSlider, setTouch]
    );

    const handleSliderMouseUp = useCallback(
      (e: any) => {
        const numVal = +valueRange ? +valueRange : minValue;
        e.preventDefault();
        e.stopPropagation();

        if (ranges) {
          handleOnChange(e, String(correctValueWithRanges(ranges, numVal, minValue, maxValue)));
        }
        onChange && onChange(e, String(numVal));

        setTouch(false);
      },
      [onChange, maxValue, minValue, valueRange, ranges, handleOnChange]
    );

    const onItemPointClick = (e: any, value: number) => {
      e.preventDefault();
      e.stopPropagation();
      !disabled && setAnimation(true);

      !disabled && handleOnChange(e, String(value));
    };

    const onClickTrack = useCallback(
      (e: any) => {
        if (!disabled) {
          const rangeWidth = trackRef.current ? trackRef.current.offsetWidth : 0;
          const correctLeft = trackRef.current
            ? trackRef.current.getBoundingClientRect().left || 0
            : 0;
          setAnimation(true);
          let sliderPosition = ((maxValue - minValue) / rangeWidth) * (e.pageX - correctLeft);

          if (!step || step >= 1) {
            sliderPosition = Math.round(sliderPosition);
          }
          let calcValue = sliderPosition + minValue;
          if (step) {
            calcValue = Math.round(calcValue / step) * step;
          }
          const value = calcValue.toString();
          if (ranges) {
            const numVal = value ? parseFloat(value) : minValue;
            handleOnChange(e, String(correctValueWithRanges(ranges, numVal, minValue, maxValue)));
          } else {
            correctSliderPosition(value);

            handleSliderMouseDown(e);
          }
        }
      },
      [
        correctSliderPosition,
        disabled,
        handleOnChange,
        handleSliderMouseDown,
        maxValue,
        minValue,
        ranges,
        step,
      ]
    );

    const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
      const { value } = event.target;

      const numValue = value ? parseFloat(value.replace(/ /, '')) : minValue;
      setAnimation(false);
      if (ranges) {
        handleOnChange(event, String(correctValueWithRanges(ranges, numValue, minValue, maxValue)));
      }

      if (numValue <= minValue || +numValue === 0) {
        handleOnChange(event, String(minValue));
      } else if (numValue >= maxValue) {
        handleOnChange(event, String(maxValue));
      }

      onBlur && onBlur(event, value);
    };

    return (
      <RangeWrapper className={className} data-test-id={dataTestId} width={width}>
        {inInput && (
          <Input
            id={id}
            range
            number
            onChange={handleOnChange}
            value={formatValueWithSeparator(valueRange)}
            onBlur={handleOnBlur}
            width={width}
            disabled={disabled}
            {...props}
          />
        )}
        <TrackWrapper disabled={disabled} onTouchStart={onClickTrack} onMouseDown={onClickTrack}>
          <Track disabled={disabled}>
            <RangeTrackFilled disabled={disabled} ref={filledRef} animation={animation} />
            <RangeTrack ref={trackRef}>
              {ranges && (
                <RangePoints
                  disabled={disabled}
                  minValue={minValue}
                  maxValue={maxValue}
                  ranges={ranges}
                  value={valueRange}
                  onItemClick={onItemPointClick}
                  animation={animation}
                />
              )}
              <RangeSlider disabled={disabled} ref={sliderRef} animation={animation}>
                <SliderCircle
                  disabled={disabled}
                  onTouchStart={handleSliderMouseDown}
                  onMouseDown={handleSliderMouseDown}
                />
              </RangeSlider>
              <ValueStart
                disabled={disabled}
                onMouseDown={(e: any) => {
                  onItemPointClick(e, minValue);
                }}
              >
                <Body2Short>{minValue}</Body2Short>
              </ValueStart>
              <ValueEnd
                disabled={disabled}
                onMouseDown={(e: any) => {
                  onItemPointClick(e, maxValue);
                }}
                isRight
              >
                <Body2Short>{maxValue}</Body2Short>
              </ValueEnd>
            </RangeTrack>
          </Track>
        </TrackWrapper>
      </RangeWrapper>
    );
  }
);

Range.displayName = 'Range';

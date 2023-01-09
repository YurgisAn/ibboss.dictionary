import React, { useMemo } from 'react';

import { Body2Short } from '../Typography';
import type { IRangesProps } from '../Range';

import { PointItem, PointsWrapper, PointValue } from './StyledComponents';

interface IRangePoints {
  minValue: number;
  maxValue: number;
  ranges: IRangesProps[];
  value: string;
  onItemClick: (e: any, value: number) => void;
  animation: boolean;
  disabled?: boolean;
}

export const RangePoints = ({
  minValue,
  maxValue,
  ranges,
  value,
  onItemClick,
  animation,
  disabled,
}: IRangePoints) => {
  const ragesItems = useMemo(
    () =>
      [{ value: minValue }, ...ranges, { value: maxValue }].filter(
        (d) => d.value >= minValue && d.value <= maxValue
      ),
    [ranges, minValue, maxValue]
  );
  const relateRange = maxValue - minValue;
  return (
    <>
      {ragesItems.map((rageElem, index) => {
        const elemValue = rageElem.value.toString();
        const position = ((rageElem.value - minValue) / relateRange) * 100;
        const active = +value >= rageElem.value;
        return (
          <PointsWrapper
            position={position}
            key={elemValue + index}
            onTouchStart={(e: any) => {
              onItemClick(e, rageElem.value);
            }}
            onMouseDown={(e: any) => {
              onItemClick(e, rageElem.value);
            }}
          >
            <PointItem active={active} animation={animation} disabled={disabled} />
            <PointValue disabled={disabled}>
              <Body2Short>
                {index === 0 || rageElem.value === maxValue ? null : rageElem.value}
              </Body2Short>
            </PointValue>
          </PointsWrapper>
        );
      })}
    </>
  );
};

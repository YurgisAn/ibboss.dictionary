interface IRangeProps {
  value: number;
}

export const correctValueWithRanges = (
  ranges: IRangeProps[],
  value: number,
  minValue: number,
  maxValue: number
) => {
  const fullRangePoints = [...ranges.map((elem) => elem.value), minValue, maxValue].sort(
    (a, b) => a - b
  );

  const closestRight = Math.min(...fullRangePoints.filter((v) => v >= value));
  const closestLeft = Math.max(...fullRangePoints.filter((v) => v <= value));

  const resultValue = closestRight - value <= value - closestLeft ? closestRight : closestLeft;

  return resultValue;
};

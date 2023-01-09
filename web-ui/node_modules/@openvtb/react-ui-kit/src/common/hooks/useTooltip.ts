import { useRef, useState, useEffect, MutableRefObject } from 'react';

export const useTooltip = () => {
  const [tooltipItems, setTooltipItems] = useState<boolean[]>([false]);

  const refItems: MutableRefObject<never[]> = useRef([]);

  useEffect(() => {
    const isOverflow = () =>
      setTooltipItems(
        refItems?.current.map(
          (itemRef: HTMLDivElement) => itemRef?.offsetWidth < itemRef?.scrollWidth
        )
      );

    isOverflow();
  }, [refItems, setTooltipItems]);

  const itemsRef: any = (el: HTMLDivElement, id: string | number) => (refItems.current[id] = el);

  return [tooltipItems, itemsRef];
};

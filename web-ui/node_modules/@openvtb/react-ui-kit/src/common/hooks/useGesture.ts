import React, { useState } from 'react';

export type Gesture = 'none' | 'left' | 'right' | 'up' | 'down' | 'tap';

const DELTA_X = 20;
const DELTA_Y = 20;

export const useGesture = () => {
  const gestureHandler = () => {
    const deltaX = Math.abs(touchEndX - touchStartX);
    const deltaY = Math.abs(touchEndY - touchStartY);
    if (deltaX < DELTA_X && deltaY < DELTA_Y) {
      return setGesture('tap');
    }
    if (deltaX >= DELTA_X && deltaX >= deltaY) {
      setGesture(touchEndX > touchStartX ? 'right' : 'left');
    }
    if (deltaY >= DELTA_Y && deltaX <= deltaY) {
      setGesture(touchEndY > touchStartY ? 'down' : 'up');
    }
  };

  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  const [gesture, setGesture] = useState<Gesture>('none');
  const gestureBinding = {
    onTouchStart: (e: React.TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      gestureHandler();
    },
  };

  return [gesture, gestureBinding];
};

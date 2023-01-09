import { useState, useEffect } from 'react';

export const useLoaded = ({ src, srcSet }) => {
  const [loaded, setLoaded] = useState<'loaded' | 'error' | boolean>(false);

  useEffect(() => {
    if (!src && !srcSet) return;
    setLoaded(false);

    let effectActive = true;
    const image = new Image();
    image.src = src;
    if (srcSet) {
      image.srcset = srcSet;
    }

    image.onload = () => {
      if (!effectActive) {
        return;
      }
      setLoaded('loaded');
    };
    image.onerror = () => {
      if (!effectActive) {
        return;
      }
      setLoaded('error');
    };
    return () => {
      effectActive = false;
    };
  }, [src, srcSet]);

  return loaded;
};

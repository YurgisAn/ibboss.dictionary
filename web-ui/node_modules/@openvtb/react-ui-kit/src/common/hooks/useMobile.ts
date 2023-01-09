import { useEffect, useState } from 'react';

export const useMobile = () => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    setMobile(
      Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i))
    );
  }, []);

  return mobile;
};

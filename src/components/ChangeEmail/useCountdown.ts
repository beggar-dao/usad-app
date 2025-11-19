import { useEffect, useState } from 'react';

export const useCountdown = (initialTime: number = 60) => {
  const [countdown, setCountdown] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCounting && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCounting(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, isCounting]);

  const startCountdown = () => {
    setCountdown(initialTime);
    setIsCounting(true);
  };

  return {
    countdown,
    isCounting,
    startCountdown,
  };
};

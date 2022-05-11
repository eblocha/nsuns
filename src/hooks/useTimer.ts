import { useEffect, useState } from 'react';

const TICK_RATE = 100;

type TimerProps = {
  timeout: number;
  onComplete: () => void;
  pause: boolean;
};

export const useTimer = ({ timeout, onComplete, pause }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(timeout);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (timeLeft >= TICK_RATE && !pause) setTimeLeft((t) => t - TICK_RATE);
    }, TICK_RATE);

    return () => clearTimeout(timeout);
  }, [pause, timeLeft]);

  useEffect(() => {
    if (timeLeft < TICK_RATE) {
      onComplete();
    }
  }, [onComplete, timeLeft]);

  return timeLeft;
};
